import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Alarm } from '../types';

type Props = {
  alarm: Alarm;
  onToggle: (id: string, enabled: boolean) => void;
  onDelete?: (id: string) => void;
  onPress?: (alarm: Alarm) => void;
};

const AlarmItem: React.FC<Props> = ({ alarm, onToggle, onDelete, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={() => onPress && onPress(alarm)}>
        <View style={styles.info}>
          <Text style={styles.title}>{alarm.name}</Text>
          <Text style={styles.subtitle}>{`${alarm.radius} m • ${alarm.latitude.toFixed(4)}, ${alarm.longitude.toFixed(4)}`}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <Switch value={alarm.enabled} onValueChange={(v) => onToggle(alarm.id, v)} />
        {onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(alarm.id)}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'white', marginHorizontal: 0 },
  content: { flex: 1, marginRight: 8 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  subtitle: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  deleteButton: { padding: 8 },
  deleteText: { fontSize: 18 },
});

export default AlarmItem;
