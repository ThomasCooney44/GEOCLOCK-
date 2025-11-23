import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

type Props = {
  latitude?: number;
  longitude?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
};

const MapPicker: React.FC<Props> = ({ latitude = 37.78825, longitude = -122.4324, onLocationSelect }) => {
  const handlePress = (e: MapPressEvent) => {
    const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate;
    onLocationSelect && onLocationSelect(lat, lng);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }} onPress={handlePress}>
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <Text style={styles.hint}>Tap the map to choose a location</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 240 },
  map: { flex: 1 },
  hint: { textAlign: 'center', marginTop: 6, color: '#666' },
});

export default MapPicker;
