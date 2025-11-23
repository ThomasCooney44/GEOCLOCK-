import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../types';

const ALARMS_KEY = 'geoclock:alarms';

export const StorageService = {
  getAlarms: async (): Promise<Alarm[]> => {
    try {
      const raw = await AsyncStorage.getItem(ALARMS_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Alarm[];
    } catch (e) {
      console.warn('getAlarms error', e);
      return [];
    }
  },

  saveAlarms: async (alarms: Alarm[]) => {
    try {
      await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(alarms));
    } catch (e) {
      console.warn('saveAlarms error', e);
    }
  },
};

export default StorageService;
