import * as Location from 'expo-location';
import { LocationCoords, LocationPermissionStatus } from '../types';

/**
 * Location service for handling location permissions and tracking
 */
export class LocationService {
  /**
   * Request location permissions
   * Returns the permission status
   */
  static async requestPermissions(): Promise<LocationPermissionStatus> {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        return 'denied';
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        // Foreground is granted but background is not
        return 'denied';
      }

      return 'granted';
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return 'denied';
    }
  }

  /**
   * Check current permission status
   */
  static async checkPermissions(): Promise<{
    foreground: LocationPermissionStatus;
    background: LocationPermissionStatus;
  }> {
    try {
      const foregroundStatus = await Location.getForegroundPermissionsAsync();
      const backgroundStatus = await Location.getBackgroundPermissionsAsync();

      return {
        foreground: foregroundStatus.granted ? 'granted' : 
                   foregroundStatus.canAskAgain ? 'undetermined' : 'denied',
        background: backgroundStatus.granted ? 'granted' : 
                   backgroundStatus.canAskAgain ? 'undetermined' : 'denied',
      };
    } catch (error) {
      console.error('Error checking permissions:', error);
      return {
        foreground: 'denied',
        background: 'denied',
      };
    }
  }

  /**
   * Get current location
   */
  static async getCurrentLocation(): Promise<LocationCoords | null> {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Start background location tracking
   * This will check location periodically and call the callback when user enters a geofence
   */
  static async startBackgroundTracking(
    onLocationUpdate: (location: LocationCoords) => void,
    options?: {
      accuracy?: Location.Accuracy;
      timeInterval?: number;
      distanceInterval?: number;
    }
  ): Promise<Location.LocationSubscription | null> {
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: options?.accuracy || Location.Accuracy.Balanced,
          timeInterval: options?.timeInterval || 5000, // 5 seconds
          distanceInterval: options?.distanceInterval || 100, // 100 meters
        },
        (location) => {
          onLocationUpdate({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return subscription;
    } catch (error) {
      console.error('Error starting background tracking:', error);
      return null;
    }
  }

  /**
   * Calculate distance between two coordinates in meters
   * Uses Haversine formula
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Check if a location is within a geofence (radius)
   */
  static isWithinGeofence(
    userLocation: LocationCoords,
    targetLocation: LocationCoords,
    radiusMeters: number
  ): boolean {
    const distance = this.calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= radiusMeters;
  }

  /**
   * Reverse geocode coordinates to get address
   */
  static async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (addresses.length > 0) {
        const addr = addresses[0];
        const parts = [
          addr.street,
          addr.streetNumber,
          addr.city,
          addr.region,
        ].filter(Boolean);
        return parts.join(', ') || 'Custom location';
      }
      return 'Custom location';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Custom location';
    }
  }
}

