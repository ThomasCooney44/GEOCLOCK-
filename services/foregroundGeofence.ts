import * as Location from 'expo-location';
import { NotificationService } from './notifications';
import { StorageService } from './storage';

let locationSubscription: Location.LocationSubscription | null = null;
let lastTriggeredAlarms: Set<string> = new Set();

// Haversine distance calculation (same as background service)
function getDistanceBetweenCoords(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

export const ForegroundGeofenceService = {
  startWatching: async () => {
    try {
      // Request foreground location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Foreground location permission not granted');
        return false;
      }

      // Subscribe to location updates while app is open
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000, // Check every 5 seconds
          distanceInterval: 10, // Or every 10 meters
        },
        async (location) => {
          await checkAlarms(location.coords.latitude, location.coords.longitude);
        }
      );

      console.log('Foreground geofence monitoring started');
      return true;
    } catch (e) {
      console.warn('Failed to start foreground geofence monitoring', e);
      return false;
    }
  },

  stopWatching: async () => {
    if (locationSubscription) {
      locationSubscription.remove();
      locationSubscription = null;
      lastTriggeredAlarms.clear();
      console.log('Foreground geofence monitoring stopped');
    }
  },
};

async function checkAlarms(latitude: number, longitude: number) {
  try {
    const alarms = await StorageService.getAlarms();

    for (const alarm of alarms) {
      if (!alarm.enabled) continue;

      const distance = getDistanceBetweenCoords(latitude, longitude, alarm.latitude, alarm.longitude);

      // Trigger alarm if user entered geofence and hasn't already been triggered recently
      if (distance <= alarm.radius && !lastTriggeredAlarms.has(alarm.id)) {
        lastTriggeredAlarms.add(alarm.id);
        console.log(`🎯 Geofence triggered for: ${alarm.name} (${Math.round(distance)}m away)`);

        // Send notification
        await NotificationService.sendLocalNotification(
          '🎯 GeoClock Alarm',
          `You've arrived at ${alarm.name}! (${Math.round(distance)}m away)`
        );

        // Reset trigger after 10 minutes to allow re-trigger if user leaves and comes back
        setTimeout(() => {
          lastTriggeredAlarms.delete(alarm.id);
        }, 600000);

        // Optional: disable alarm after trigger
        if (alarm.disableAfterTrigger) {
          const updated = alarms.map((a) =>
            a.id === alarm.id ? { ...a, enabled: false } : a
          );
          await StorageService.saveAlarms(updated);
        }
      } else if (distance > alarm.radius && lastTriggeredAlarms.has(alarm.id)) {
        // User left the geofence area
        lastTriggeredAlarms.delete(alarm.id);
        console.log(`📍 Left geofence for: ${alarm.name}`);
      }
    }
  } catch (e) {
    console.warn('Error checking alarms', e);
  }
}

export default ForegroundGeofenceService;
