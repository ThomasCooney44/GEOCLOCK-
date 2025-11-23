import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface DistanceSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  unit: 'meters' | 'kilometers';
  min?: number;
  max?: number;
  step?: number;
}

export const DistanceSlider: React.FC<DistanceSliderProps> = ({
  value,
  onValueChange,
  unit,
  min = 500,
  max = 5000,
  step = 100,
}) => {
  const formatValue = (val: number) => {
    if (unit === 'kilometers') {
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)} km`;
      }
      return `${val} m`;
    }
    return `${val} m`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Distance Radius</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.minLabel}>{formatValue(min)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#4CAF50"
        />
        <Text style={styles.maxLabel}>{formatValue(max)}</Text>
      </View>
      <Text style={styles.valueLabel}>Current: {formatValue(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 12,
  },
  minLabel: {
    fontSize: 12,
    color: '#666',
    minWidth: 50,
  },
  maxLabel: {
    fontSize: 12,
    color: '#666',
    minWidth: 50,
    textAlign: 'right',
  },
  valueLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 8,
  },
});

