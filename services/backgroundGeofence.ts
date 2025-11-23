import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { NotificationService } from './notifications';
import { StorageService } from './storage';

const GEOFENCE_TASK_NAME = 'GEOFENCE_MONITORING';

// Register the background task
TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data: { locations }, error }: any) => {
  if (error) {
    console.warn('Geofence task error:', error);
    return;
  }

  if (!locations || locations.length === 0) {
    return;
  }

  const currentLocation = locations[0];
  const alarms = await StorageService.getAlarms();

  // Check each enabled alarm against current location
  for (const alarm of alarms) {
    if (!alarm.enabled) continue;

    // Calculate distance using simple Haversine formula
    const distance = getDistanceBetweenCoords(
      currentLocation.latitude,
      currentLocation.longitude,
      alarm.latitude,
      alarm.longitude
    );

    // If user is within geofence radius, trigger notification
    if (distance <= alarm.radius) {
      console.log(`Geofence triggered for: ${alarm.name}`);
      await NotificationService.sendLocalNotification(
        'GeoClock Alarm',
        `You've arrived at ${alarm.name}! (${Math.round(distance)}m away)`
      );

      // Optional: disable alarm after trigger
      if (alarm.disableAfterTrigger) {
        const updated = alarms.map((a) =>
          a.id === alarm.id ? { ...a, enabled: false } : a
        );
        await StorageService.saveAlarms(updated);
      }
    }
  }
});

// Haversine distance calculation
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

export const BackgroundGeofenceService = {
  startGeofenceMonitoring: async () => {
    try {
      // Request permissions
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Background location permission not granted');
        return false;
      }

      // Start background location updates
      await Location.startLocationUpdatesAsync(GEOFENCE_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 60000, // Check every minute
        distanceInterval: 100, // Or every 100 meters
        foregroundService: {
          notificationTitle: 'GeoClock',
          notificationBody: 'Monitoring your location for geofenced alarms',
          notificationColor: '#007AFF',
        },
      });

      console.log('Background geofence monitoring started');
      return true;
    } catch (e) {
      console.warn('Failed to start background geofence monitoring', e);
      return false;
    }
  },

  stopGeofenceMonitoring: async () => {
    try {
      const isMonitoring = await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
      if (isMonitoring) {
        await Location.stopLocationUpdatesAsync(GEOFENCE_TASK_NAME);
        console.log('Background geofence monitoring stopped');
      }
    } catch (e) {
      console.warn('Failed to stop background geofence monitoring', e);
    }
  },

  isMonitoring: async () => {
    return TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
  },
};

export default BackgroundGeofenceService;
