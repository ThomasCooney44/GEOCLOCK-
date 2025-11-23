import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeoAlarm } from '../types';
import { GeoAlarmStorage } from '../services/storage';
import { AlarmItem } from '../components/AlarmItem';
import { GeofenceService } from '../services/geofence';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DISTANCE_UNIT_KEY = '@geoclock:distanceUnit';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [alarms, setAlarms] = useState<GeoAlarm[]>([]);
  const [distanceUnit, setDistanceUnit] = useState<'meters' | 'kilometers'>('meters');
  const [refreshing, setRefreshing] = useState(false);

  const loadAlarms = useCallback(async () => {
    try {
      const allAlarms = await GeoAlarmStorage.getAllAlarms();
      setAlarms(allAlarms);
    } catch (error) {
      console.error('Error loading alarms:', error);
      Alert.alert('Error', 'Failed to load alarms.');
    }
  }, []);

  const loadDistanceUnit = useCallback(async () => {
    try {
      const unit = await AsyncStorage.getItem(DISTANCE_UNIT_KEY);
      if (unit === 'kilometers' || unit === 'meters') {
        setDistanceUnit(unit);
      }
    } catch (error) {
      console.error('Error loading distance unit:', error);
    }
  }, []);

  useEffect(() => {
    loadAlarms();
    loadDistanceUnit();

    // Set up focus listener to reload when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadAlarms();
      loadDistanceUnit();
    });

    // Start geofence monitoring
    GeofenceService.startMonitoring();

    return () => {
      unsubscribe();
    };
  }, [navigation, loadAlarms, loadDistanceUnit]);

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      await GeoAlarmStorage.updateAlarm(id, { enabled });
      
      // Reset triggered state if re-enabling
      if (enabled) {
        GeofenceService.resetTriggeredState(id);
      }
      
      await loadAlarms();
    } catch (error) {
      console.error('Error toggling alarm:', error);
      Alert.alert('Error', 'Failed to update alarm.');
    }
  };

  const handlePress = (alarm: GeoAlarm) => {
    navigation.navigate('EditAlarm', { alarmId: alarm.id });
  };

  const handleAdd = () => {
    navigation.navigate('CreateAlarm');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlarms();
    setRefreshing(false);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No geo alarms yet</Text>
      <Text style={styles.emptySubtext}>
        Tap the + button to create your first location-based alarm
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>GeoClock</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlarmItem
            alarm={item}
            distanceUnit={distanceUnit}
            onToggle={handleToggle}
            onPress={handlePress}
          />
        )}
        contentContainerStyle={alarms.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  settingsButtonText: {
    fontSize: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});

