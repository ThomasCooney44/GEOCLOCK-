import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Slider from '@react-native-community/slider';
import { RootStackParamList } from '../navigation/AppNavigator';
import MapPicker from '../components/MapPicker';
import { StorageService } from '../services/storage';
import { Alarm } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAlarm'>;

const CreateAlarmScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [radius, setRadius] = useState(500);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an alarm name');
      return false;
    }
    if (radius < 100 || radius > 5000) {
      Alert.alert('Error', 'Radius must be between 100m and 5000m');
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      const alarms = await StorageService.getAlarms();
      const newAlarm: Alarm = {
        id: String(Date.now()),
        name: name.trim(),
        latitude,
        longitude,
        radius,
        enabled: true,
      };
      
      await StorageService.saveAlarms([...alarms, newAlarm]);
      Alert.alert('Success', `"${newAlarm.name}" created!`, [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to create alarm');
      console.warn('Create alarm error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionLabel}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Home, Work, Gym"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />

      <Text style={styles.sectionLabel}>Location</Text>
      <MapPicker
        latitude={latitude}
        longitude={longitude}
        onLocationSelect={(lat, lng) => {
          setLatitude(lat);
          setLongitude(lng);
        }}
      />

      <Text style={styles.sectionLabel}>Radius: {radius}m ({(radius / 1000).toFixed(1)}km)</Text>
      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={5000}
        step={100}
        value={radius}
        onValueChange={setRadius}
        minimumTrackTintColor="#2196F3"
        maximumTrackTintColor="#ddd"
      />

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>📍 Tap map to set location</Text>
        <Text style={styles.summaryText}>⚪ Alarm triggers within {radius}m</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.navigate('Home')}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.createButton, loading && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.createButtonText}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9' 
  },
  content: { 
    padding: 16, 
    paddingBottom: 24 
  },
  sectionLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  slider: { 
    height: 40, 
    marginVertical: 12,
  },
  summaryBox: { 
    backgroundColor: '#e3f2fd', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 20,
    marginBottom: 24,
  },
  summaryText: { 
    fontSize: 13, 
    color: '#1976d2',
    marginVertical: 4,
  },
  buttonRow: { 
    flexDirection: 'row', 
    gap: 10,
  },
  button: { 
    flex: 1, 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: { 
    backgroundColor: '#2196F3',
  },
  createButtonText: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 15,
  },
  cancelButton: { 
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: { 
    color: '#333', 
    fontWeight: '600', 
    fontSize: 15,
  },
  buttonDisabled: { 
    opacity: 0.6,
  },
});

export default CreateAlarmScreen;
