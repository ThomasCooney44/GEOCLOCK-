import * as Location from 'expo-location';

export const LocationService = {
  getCurrentPositionAsync: async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return null;
      const pos = await Location.getCurrentPositionAsync({});
      return pos;
    } catch (e) {
      console.warn('Location error', e);
      return null;
    }
  },
};

export default LocationService;
