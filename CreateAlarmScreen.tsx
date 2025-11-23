import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MapPicker } from '../components/MapPicker';
import { DistanceSlider } from '../components/DistanceSlider';
import { GeoAlarmStorage } from '../services/storage';
import { LocationCoords } from '../types';
import { GeofenceService } from '../services/geofence';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateAlarmScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<string>('');
  const [radiusMeters, setRadiusMeters] = useState(1000);
  const [enabled, setEnabled] = useState(true);
  const [disableAfterTrigger, setDisableAfterTrigger] = useState(false);

  const handleLocationSelect = (loc: LocationCoords, addr?: string) => {
    setLocation(loc);
    if (addr) setAddress(addr);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an alarm name.');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Please select a location on the map.');
      return;
    }

    try {
      const newAlarm = await GeoAlarmStorage.createAlarm({
        name: name.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        radiusMeters,
        enabled,
        disableAfterTrigger,
        address: address || undefined,
      });

      // Register with geofence service
      GeofenceService.addGeofence(newAlarm);

      Alert.alert('Success', 'Alarm created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error creating alarm:', error);
      Alert.alert('Error', 'Failed to create alarm.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Alarm Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Home, Work, Gym"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <MapPicker
          onLocationSelect={handleLocationSelect}
        />
        {address ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Selected:</Text>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <DistanceSlider
          value={radiusMeters}
          onValueChange={setRadiusMeters}
          unit="meters"
          min={100}
          max={5000}
          step={50}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Alarm</Text>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={enabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.switchRow}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.switchLabel}>Disable After Trigger</Text>
            <Text style={styles.switchDescription}>
              Automatically disable this alarm after it triggers once
            </Text>
          </View>
          <Switch
            value={disableAfterTrigger}
            onValueChange={setDisableAfterTrigger}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={disableAfterTrigger ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Create Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
  },
  addressContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginTop: 8,
  },
  addressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

