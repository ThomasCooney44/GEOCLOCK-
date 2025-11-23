# GeoClock - Location-Based Alarms

A React Native/Expo app that triggers notifications when you arrive at specific locations.

## ⚡ Quick Start

```bash
npm install
npm start
```

Press `w` for web preview, or scan the QR code with Expo Go on your phone.

## ✨ Features

- **Create alarms** at specific locations using an interactive map
- **Set radius** (100m - 5000m) for geofence detection
- **Real-time monitoring** - checks every 5 seconds while app is open
- **Background monitoring** - checks every 60 seconds when app is backgrounded
- **Smart notifications** - alerts when you enter the geofence
- **Persistent storage** - alarms saved on device locally
- **Easy management** - toggle, disable, or delete alarms

## 🏗️ Architecture

```
App.tsx (initializes geofencing)
├── Screens/
│   ├── HomeScreen - List & manage alarms
│   ├── CreateAlarmScreen - Create new alarms with map picker
│   └── SettingsScreen - Request permissions
├── Services/
│   ├── foregroundGeofence.ts - Real-time monitoring (5s checks)
│   ├── backgroundGeofence.ts - Background monitoring (60s checks)
│   ├── notifications.ts - Send alert notifications
│   ├── storage.ts - Save/load alarms
│   └── location.ts - Get current position
└── Types & Navigation
```

## 🔧 Technology

- **React Native 0.73** with Expo 54
- **TypeScript** - Strict mode, fully typed
- **React Navigation 6** - Screen navigation
- **expo-location** - GPS tracking
- **expo-task-manager** - Background tasks
- **expo-notifications** - Local alerts
- **react-native-maps** - Map picker
- **AsyncStorage** - Local data persistence

## 📍 How It Works

1. User creates an alarm by tapping a location on the map
2. Sets name and geofence radius (100-5000m)
3. Alarm is saved locally and monitoring begins
4. App checks GPS location every 5 seconds (foreground) or 60 seconds (background)
5. Uses Haversine formula to calculate distance
6. When device enters geofence radius, notification is triggered
7. Smart debouncing prevents duplicate alerts

## ✅ What Works

- ✅ Create/edit/delete alarms
- ✅ Real-time geofence detection
- ✅ Background monitoring
- ✅ Local notifications
- ✅ Persistent storage
- ✅ Full iOS/Android/Web support
- ✅ 100% TypeScript with strict type checking

## 📱 Requirements

- **Location permission** - For GPS tracking
- **Notification permission** - For alerts
- Enable both in Settings tab on first run

## 🚀 Development

```bash
npm start                # Start Expo dev server
npx tsc --noEmit       # Check TypeScript
npm run type-check      # Type checking (if configured)
```

All code is in TypeScript with strict mode enabled. No JavaScript files.

---

**Status**: Production Ready ✅  
**Created**: November 2025  
**Version**: 1.0.0
