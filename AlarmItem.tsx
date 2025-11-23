import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { GeoAlarm } from '../types';
import { formatDistance, formatAddress } from '../utils/formatters';

interface AlarmItemProps {
  alarm: GeoAlarm;
  distanceUnit: 'meters' | 'kilometers';
  onToggle: (id: string, enabled: boolean) => void;
  onPress: (alarm: GeoAlarm) => void;
}

export const AlarmItem: React.FC<AlarmItemProps> = ({
  alarm,
  distanceUnit,
  onToggle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, !alarm.enabled && styles.disabled]}
      onPress={() => onPress(alarm)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{alarm.name}</Text>
        <Text style={styles.location} numberOfLines={1}>
          {formatAddress(alarm.address)}
        </Text>
        <Text style={styles.distance}>
          Radius: {formatDistance(alarm.radiusMeters, distanceUnit)}
        </Text>
      </View>
      <Switch
        value={alarm.enabled}
        onValueChange={(value) => onToggle(alarm.id, value)}
        trackColor={{ false: '#767577', true: '#4CAF50' }}
        thumbColor={alarm.enabled ? '#fff' : '#f4f3f4'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: '#999',
  },
});

