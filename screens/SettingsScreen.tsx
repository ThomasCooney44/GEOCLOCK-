import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { NotificationService } from '../services/notifications';
import { LocationService } from '../services/location';

const SettingsScreen: React.FC = () => {
  const [notificationsGranted, setNotificationsGranted] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  const handleNotifications = async () => {
    try {
      const ok = await NotificationService.requestPermissions();
      setNotificationsGranted(ok);
      Alert.alert('Notifications', ok ? '✅ Enabled' : '❌ Not enabled');
    } catch (e) {
      Alert.alert('Error', 'Failed to request permission');
    }
  };

  const handleLocation = async () => {
    try {
      const pos = await LocationService.getCurrentPositionAsync();
      setLocationGranted(!!pos);
      Alert.alert('Location', pos ? '✅ Enabled' : '❌ Not enabled');
    } catch (e) {
      Alert.alert('Error', 'Failed to request permission');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionLabel}>Permissions</Text>

      <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
          <View>
            <Text style={styles.permissionTitle}>📍 Location</Text>
            <Text style={styles.permissionDesc}>Required for geofencing</Text>
          </View>
          <View style={[styles.badge, locationGranted && styles.badgeActive]}>
            <Text style={styles.badgeText}>{locationGranted ? '✓' : '○'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLocation}>
          <Text style={styles.buttonText}>
            {locationGranted ? 'Enabled' : 'Enable'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
          <View>
            <Text style={styles.permissionTitle}>🔔 Notifications</Text>
            <Text style={styles.permissionDesc}>Alerts when alarm triggers</Text>
          </View>
          <View style={[styles.badge, notificationsGranted && styles.badgeActive]}>
            <Text style={styles.badgeText}>{notificationsGranted ? '✓' : '○'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNotifications}>
          <Text style={styles.buttonText}>
            {notificationsGranted ? 'Enabled' : 'Enable'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>About</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>GeoClock v1.0</Text>
        <Text style={styles.infoText}>Location-based alarms</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9' 
  },
  content: { 
    padding: 16, 
    paddingBottom: 24 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  sectionLabel: { 
    fontSize: 14, 
    fontWeight: '600',
    color: '#2196F3',
    marginTop: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  permissionCard: { 
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  permissionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionTitle: { 
    fontSize: 15, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  permissionDesc: { 
    fontSize: 12, 
    color: '#999',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: '#e8f5e9',
  },
  badgeText: { 
    fontSize: 16, 
    fontWeight: '600',
  },
  button: { 
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { 
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  infoCard: { 
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoText: { 
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});
