import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationCoords } from '../types';
import { LocationService } from '../services/location';

interface MapPickerProps {
  initialLocation?: LocationCoords;
  onLocationSelect: (location: LocationCoords, address?: string) => void;
}

export const MapPicker: React.FC<MapPickerProps> = ({
  initialLocation,
  onLocationSelect,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationCoords | null>(
    initialLocation || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Initialize map to user's current location or provided location
    const initializeMap = async () => {
      if (initialLocation) {
        setSelectedLocation(initialLocation);
        setMapRegion({
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        const address = await LocationService.reverseGeocode(
          initialLocation.latitude,
          initialLocation.longitude
        );
        if (address) {
          onLocationSelect(initialLocation, address);
        }
      } else {
        const currentLocation = await LocationService.getCurrentLocation();
        if (currentLocation) {
          setMapRegion({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      }
    };

    initializeMap();
  }, [initialLocation]);

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const location: LocationCoords = { latitude, longitude };
    setSelectedLocation(location);

    // Reverse geocode to get address
    const address = await LocationService.reverseGeocode(latitude, longitude);
    onLocationSelect(location, address || undefined);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        const result = results[0];
        const location: LocationCoords = {
          latitude: result.latitude,
          longitude: result.longitude,
        };
        setSelectedLocation(location);
        setMapRegion({
          latitude: result.latitude,
          longitude: result.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        onLocationSelect(location, searchQuery);
      } else {
        Alert.alert('Not Found', 'Could not find a location for that address.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      Alert.alert('Error', 'Failed to search for location.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    const location = await LocationService.getCurrentLocation();
    if (location) {
      setSelectedLocation(location);
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      const address = await LocationService.reverseGeocode(
        location.latitude,
        location.longitude
      );
      onLocationSelect(location, address || undefined);
    } else {
      Alert.alert('Error', 'Could not get your current location.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search address or place..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isSearching}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleUseCurrentLocation}
      >
        <Text style={styles.currentLocationButtonText}>📍 Use Current Location</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Alarm Location"
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  currentLocationButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    alignItems: 'center',
  },
  currentLocationButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
});

