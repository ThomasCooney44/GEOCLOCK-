import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './navigation/AppNavigator';
import { NotificationService } from './services/notifications';
import { GeofenceService } from './services/geofence';

export default function App() {
  useEffect(() => {
    // Configure notifications
    NotificationService.configure();

    // Request notification permissions on app start
    NotificationService.requestPermissions();

    // Start geofence monitoring
    GeofenceService.startMonitoring();

    // Cleanup on unmount
    return () => {
      GeofenceService.stopMonitoring();
    };
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

