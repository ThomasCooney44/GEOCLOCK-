import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const DISTANCE_UNIT_KEY = '@geoclock:distanceUnit';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [distanceUnit, setDistanceUnit] = useState<'meters' | 'kilometers'>('meters');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const unit = await AsyncStorage.getItem(DISTANCE_UNIT_KEY);
      if (unit === 'kilometers' || unit === 'meters') {
        setDistanceUnit(unit);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleDistanceUnitChange = async (unit: 'meters' | 'kilometers') => {
    try {
      await AsyncStorage.setItem(DISTANCE_UNIT_KEY, unit);
      setDistanceUnit(unit);
    } catch (error) {
      console.error('Error saving distance unit:', error);
      Alert.alert('Error', 'Failed to save setting.');
    }
  };

  const handleRequestPermissions = async () => {
    try {
      // Request location permissions
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is required for GeoClock to work. Please enable it in your device settings.'
        );
        return;
      }

      // Request background location permission
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        Alert.alert(
          'Background Location',
          'Background location permission is recommended for alarms to work when the app is closed. You can enable it in settings.'
        );
      }

      // Request notification permissions
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      if (notificationStatus !== 'granted') {
        Alert.alert(
          'Notification Permission',
          'Notification permission is required for alarms to work. Please enable it in your device settings.'
        );
        return;
      }

      Alert.alert('Success', 'All permissions granted!');
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request permissions.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Distance Unit</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                distanceUnit === 'meters' && styles.optionButtonActive,
              ]}
              onPress={() => handleDistanceUnitChange('meters')}
            >
              <Text
                style={[
                  styles.optionText,
                  distanceUnit === 'meters' && styles.optionTextActive,
                ]}
              >
                Meters
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                distanceUnit === 'kilometers' && styles.optionButtonActive,
              ]}
              onPress={() => handleDistanceUnitChange('kilometers')}
            >
              <Text
                style={[
                  styles.optionText,
                  distanceUnit === 'kilometers' && styles.optionTextActive,
                ]}
              >
                Kilometers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRequestPermissions}
        >
          <Text style={styles.actionButtonText}>Request Permissions</Text>
          <Text style={styles.actionButtonSubtext}>
            Location and notification permissions are required
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          GeoClock allows you to set location-based alarms that trigger when you arrive at a specific place.
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  settingItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  actionButton: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 16,
  },
});

