/**
 * GeoAlarm data model
 */
export interface GeoAlarm {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  enabled: boolean;
  disableAfterTrigger: boolean;
  createdAt: string;
  updatedAt: string;
  address?: string; // Optional address string for display
}

/**
 * Location coordinates
 */
export interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Distance unit preference
 */
export type DistanceUnit = 'meters' | 'kilometers';

/**
 * Location permission status
 */
export type LocationPermissionStatus = 'granted' | 'denied' | 'undetermined';

