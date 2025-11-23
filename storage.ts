import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeoAlarm } from '../types';

const STORAGE_KEY = '@geoclock:alarms';

/**
 * Storage service for managing geo alarms
 * Uses AsyncStorage for local persistence
 */
export class GeoAlarmStorage {
  /**
   * Get all stored alarms
   */
  static async getAllAlarms(): Promise<GeoAlarm[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Error getting alarms:', error);
      return [];
    }
  }

  /**
   * Get a single alarm by ID
   */
  static async getAlarm(id: string): Promise<GeoAlarm | null> {
    try {
      const alarms = await this.getAllAlarms();
      return alarms.find(alarm => alarm.id === id) || null;
    } catch (error) {
      console.error('Error getting alarm:', error);
      return null;
    }
  }

  /**
   * Create a new alarm
   */
  static async createAlarm(alarm: Omit<GeoAlarm, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeoAlarm> {
    try {
      const alarms = await this.getAllAlarms();
      const newAlarm: GeoAlarm = {
        ...alarm,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      alarms.push(newAlarm);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
      return newAlarm;
    } catch (error) {
      console.error('Error creating alarm:', error);
      throw error;
    }
  }

  /**
   * Update an existing alarm
   */
  static async updateAlarm(id: string, updates: Partial<GeoAlarm>): Promise<GeoAlarm | null> {
    try {
      const alarms = await this.getAllAlarms();
      const index = alarms.findIndex(alarm => alarm.id === id);
      if (index === -1) return null;

      alarms[index] = {
        ...alarms[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
      return alarms[index];
    } catch (error) {
      console.error('Error updating alarm:', error);
      throw error;
    }
  }

  /**
   * Delete an alarm
   */
  static async deleteAlarm(id: string): Promise<boolean> {
    try {
      const alarms = await this.getAllAlarms();
      const filtered = alarms.filter(alarm => alarm.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting alarm:', error);
      return false;
    }
  }

  /**
   * Get all enabled alarms
   */
  static async getEnabledAlarms(): Promise<GeoAlarm[]> {
    try {
      const alarms = await this.getAllAlarms();
      return alarms.filter(alarm => alarm.enabled);
    } catch (error) {
      console.error('Error getting enabled alarms:', error);
      return [];
    }
  }
}

