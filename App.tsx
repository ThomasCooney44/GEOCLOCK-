import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './navigation/AppNavigator';
import { NotificationService } from './services/notifications';
import { BackgroundGeofenceService } from './services/backgroundGeofence';
import { ForegroundGeofenceService } from './services/foregroundGeofence';

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Configure notifications
        NotificationService.configure();

        // Request notification permissions on app start
        const notifGranted = await NotificationService.requestPermissions();
        if (notifGranted) {
          console.log('✅ Notification permissions granted');
        }

        // Start foreground geofence monitoring (for testing in browser/while app open)
        const fgStarted = await ForegroundGeofenceService.startWatching();
        if (fgStarted) {
          console.log('✅ Foreground geofence monitoring initialized');
        }

        // Start background geofence monitoring (for when app is backgrounded)
        const bgStarted = await BackgroundGeofenceService.startGeofenceMonitoring();
        if (bgStarted) {
          console.log('✅ Background geofence monitoring initialized');
        }
      } catch (e) {
        console.warn('App initialization error', e);
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      ForegroundGeofenceService.stopWatching();
      BackgroundGeofenceService.stopGeofenceMonitoring();
    };
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

