import { GeoAlarm } from '../types';
import { LocationService } from './location';
import { NotificationService } from './notifications';
import { GeoAlarmStorage } from './storage';
import { LocationCoords } from '../types';
import * as Location from 'expo-location';

/**
 * Geofence monitoring service
 * Handles background location tracking and triggers alarms when user enters geofences
 */
export class GeofenceService {
  private static locationSubscription: Location.LocationSubscription | null = null;
  private static isMonitoring = false;
  private static triggeredAlarms = new Set<string>(); // Track recently triggered alarms

  /**
   * Start monitoring all enabled alarms
   */
  static async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      return;
    }

    try {
      // Request permissions first
      const permissions = await LocationService.checkPermissions();
      if (permissions.background !== 'granted') {
        console.warn('Background location permission not granted');
        return;
      }

      // Start location tracking
      this.locationSubscription = await LocationService.startBackgroundTracking(
        async (location) => {
          await this.checkGeofences(location);
        },
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000, // Check every 10 seconds (battery-friendly)
          distanceInterval: 50, // Update every 50 meters
        }
      );

      this.isMonitoring = true;
      console.log('Geofence monitoring started');
    } catch (error) {
      console.error('Error starting geofence monitoring:', error);
    }
  }

  /**
   * Stop monitoring
   */
  static stopMonitoring(): void {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
    this.isMonitoring = false;
    this.triggeredAlarms.clear();
    console.log('Geofence monitoring stopped');
  }

  /**
   * Check all enabled alarms against current location
   */
  private static async checkGeofences(userLocation: LocationCoords): Promise<void> {
    try {
      const enabledAlarms = await GeoAlarmStorage.getEnabledAlarms();

      for (const alarm of enabledAlarms) {
        // Skip if already triggered (to prevent spam)
        if (this.triggeredAlarms.has(alarm.id)) {
          continue;
        }

        const isWithin = LocationService.isWithinGeofence(
          userLocation,
          { latitude: alarm.latitude, longitude: alarm.longitude },
          alarm.radiusMeters
        );

        if (isWithin) {
          await this.triggerAlarm(alarm);
        }
      }
    } catch (error) {
      console.error('Error checking geofences:', error);
    }
  }

  /**
   * Trigger an alarm
   */
  private static async triggerAlarm(alarm: GeoAlarm): Promise<void> {
    try {
      // Mark as triggered
      this.triggeredAlarms.add(alarm.id);

      // Send notification
      await NotificationService.triggerAlarm(alarm.name, alarm.address);

      // Disable alarm if configured to do so
      if (alarm.disableAfterTrigger) {
        await GeoAlarmStorage.updateAlarm(alarm.id, { enabled: false });
      }

      console.log(`Alarm triggered: ${alarm.name}`);
    } catch (error) {
      console.error('Error triggering alarm:', error);
    }
  }

  /**
   * Reset triggered state for an alarm (when user manually re-enables it)
   */
  static resetTriggeredState(alarmId: string): void {
    this.triggeredAlarms.delete(alarmId);
  }

  /**
   * Reset all triggered states
   */
  static resetAllTriggeredStates(): void {
    this.triggeredAlarms.clear();
  }

  /**
   * Add a geofence to monitoring (restart monitoring to include it)
   */
  static async addGeofence(alarm: GeoAlarm): Promise<void> {
    // If monitoring is already active, it will automatically pick up enabled alarms
    // Just ensure monitoring is running
    if (!this.isMonitoring) {
      await this.startMonitoring();
    }
    // Reset triggered state for this alarm
    this.resetTriggeredState(alarm.id);
  }

  /**
   * Remove a geofence from monitoring
   */
  static removeGeofence(alarmId: string): void {
    // Remove from triggered set
    this.resetTriggeredState(alarmId);
    // Monitoring will automatically exclude disabled alarms on next check
  }
}

