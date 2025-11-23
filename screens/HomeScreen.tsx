import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import AlarmItem from '../components/AlarmItem';
import { StorageService } from '../services/storage';
import { Alarm } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAlarms = async () => {
    try {
      const a = await StorageService.getAlarms();
      setAlarms(a);
    } catch (e) {
      console.warn('Failed to load alarms', e);
    }
  };

  useFocusEffect(useCallback(() => {
    loadAlarms();
  }, []));

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAlarms();
    setRefreshing(false);
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    const updated = alarms.map((a) => (a.id === id ? { ...a, enabled } : a));
    setAlarms(updated);
    await StorageService.saveAlarms(updated);
  };

  const handleDelete = (id: string) => {
    const alarm = alarms.find((a) => a.id === id);
    Alert.alert('Delete Alarm', `Remove "${alarm?.name}"?`, [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = alarms.filter((a) => a.id !== id);
          setAlarms(updated);
          await StorageService.saveAlarms(updated);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GeoClock</Text>
        <Text style={styles.subtitle}>{alarms.length} alarm{alarms.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlarmItem
            alarm={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Alarms</Text>
            <Text style={styles.emptyText}>Create your first location alarm</Text>
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={alarms.length === 0 ? { flex: 1, justifyContent: 'center' } : undefined}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => navigation.navigate('CreateAlarm')}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>+ New Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9' 
  },
  header: { 
    backgroundColor: '#2196F3', 
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: { 
    fontSize: 36, 
    fontWeight: '700', 
    color: 'white',
    marginBottom: 4,
  },
  subtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.9)',
  },
  footer: { 
    flexDirection: 'row', 
    gap: 10, 
    padding: 16, 
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  createButton: { 
    flex: 1, 
    backgroundColor: '#2196F3', 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 15,
  },
  settingsButton: { 
    width: 50,
    backgroundColor: '#f5f5f5', 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButtonText: { 
    fontSize: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#999',
    marginBottom: 8,
  },
  emptyText: { 
    fontSize: 14, 
    color: '#bbb',
  },
});

export default HomeScreen;
