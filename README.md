# GeoClock

A React Native app built with Expo that allows you to set location-based alarms. Get notified when you arrive at specific places!

## Features

- 🗺️ Set alarms based on geographic locations
- 📍 Pick locations using an interactive map
- 🔔 Receive notifications when you arrive at your destination
- ⚙️ Customize alarm distance radius
- 💾 Persistent storage of your alarms

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (installed globally or via npx)
- For mobile testing: Expo Go app on your iOS/Android device

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd geoclock
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Option 1: Using Expo Go (Recommended for Testing)

1. Start the Expo development server:
```bash
npm start
```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Option 2: Run on Web

```bash
npm run web
```

### Option 3: Run on Android Emulator

```bash
npm run android
```

### Option 4: Run on iOS Simulator (macOS only)

```bash
npm run ios
```

## Running in GitHub Codespaces

1. Open this repository in GitHub Codespaces
2. The environment will automatically install dependencies
3. Run `npm start` to start the Expo development server
4. Use the "Ports" tab in Codespaces to access the Expo dev server
5. Connect via Expo Go app on your mobile device using the tunnel URL

## Project Structure

```
geoclock/
├── App.tsx                 # Main app component
├── components/             # Reusable UI components
│   ├── AlarmItem.tsx
│   ├── DistanceSlider.tsx
│   └── MapPicker.tsx
├── screens/                # Screen components
│   ├── HomeScreen.tsx
│   ├── CreateAlarmScreen.tsx
│   ├── EditAlarmScreen.tsx
│   └── SettingsScreen.tsx
├── services/               # Business logic services
│   ├── geofence.ts        # Location monitoring
│   ├── location.ts        # Location utilities
│   ├── notifications.ts   # Push notifications
│   └── storage.ts         # Data persistence
├── navigation/             # Navigation setup
│   └── AppNavigator.tsx
├── types/                  # TypeScript type definitions
│   └── index.ts
└── utils/                  # Utility functions
    └── formatters.ts
```

## Permissions

The app requires the following permissions:
- **Location**: To track your position and trigger geofence alarms
- **Notifications**: To alert you when you arrive at a location

These permissions are requested when you first use location-based features.

## Technologies Used

- **Expo** (~50.0.0) - React Native framework
- **React Navigation** - Navigation library
- **expo-location** - Location services
- **expo-notifications** - Push notifications
- **react-native-maps** - Map component
- **TypeScript** - Type safety

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start -c`
2. **Location not working**: Ensure location permissions are granted in device settings
3. **Notifications not showing**: Check notification permissions in device settings

## License

Private project

## Support

For issues and questions, please open an issue in the repository.

