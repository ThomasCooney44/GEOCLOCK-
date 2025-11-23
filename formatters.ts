import { DistanceUnit } from '../types';

/**
 * Format distance based on unit preference
 */
export function formatDistance(meters: number, unit: DistanceUnit = 'meters'): string {
  if (unit === 'kilometers') {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  }
  return `${meters} m`;
}

/**
 * Format address for display
 */
export function formatAddress(address?: string): string {
  if (!address) return 'Custom location';
  return address.length > 50 ? address.substring(0, 50) + '...' : address;
}

