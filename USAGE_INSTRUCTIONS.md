# GeoClock Prototype - Usage Instructions

## ✅ Project Status
All files have been verified and fixed:
- ✅ App.tsx exists and is properly configured
- ✅ AppNavigator.tsx with React Navigation setup
- ✅ All screens: HomeScreen, CreateAlarmScreen, EditAlarmScreen, SettingsScreen
- ✅ All dependencies installed (expo-location, expo-notifications, react-native-maps, etc.)
- ✅ All imports verified and fixed
- ✅ Missing methods added to GeofenceService
- ✅ Cache cleared and server started

## 🚀 How to Run the App

### Option 1: On Your Phone (Recommended for Testing)

#### Step 1: Download Expo Go
- **iPhone**: Go to App Store → Search "Expo Go" → Install
- **Android**: Go to Google Play Store → Search "Expo Go" → Install

#### Step 2: Connect Your Phone
1. **Make sure your phone and laptop are on the SAME Wi-Fi network**
2. **Check your terminal** - The Expo server should be running and displaying a QR code
3. **Alternative**: Open the `qrcode.png` file in your project folder

#### Step 3: Scan the QR Code
- **iPhone**: 
  - Open the Camera app
  - Point it at the QR code in your terminal or the qrcode.png file
  - Tap the notification that appears
  - It will open in Expo Go
- **Android**:
  - Open the Expo Go app
  - Tap "Scan QR code"
  - Point your camera at the QR code

#### Step 4: Wait for App to Load
- The app will bundle and load (this may take 30-60 seconds the first time)
- You should see the GeoClock home screen

### Option 2: In a Web Browser

1. **Open your browser** and go to: `http://localhost:19002`
2. This opens the Expo Dev Tools
3. Click **"Run in web browser"** or press `w` in the terminal
4. Note: Some features (like maps and location) may not work fully in web

### Option 3: Android Emulator

1. Make sure you have Android Studio installed with an emulator set up
2. In your terminal, press `a` or run: `npx expo start --android`
3. The app will open in the Android emulator

### Option 4: iOS Simulator (Mac only)

1. Make sure you have Xcode installed
2. In your terminal, press `i` or run: `npx expo start --ios`
3. The app will open in the iOS simulator

## 📱 Using the App

### Home Screen
- View all your geo alarms
- Toggle alarms on/off with the switch
- Tap an alarm to edit it
- Tap the **+** button to create a new alarm
- Tap the **⚙️** button to open settings

### Creating an Alarm
1. Tap the **+** button
2. Enter an alarm name (e.g., "Home", "Work")
3. Select a location:
   - Tap on the map to choose a location
   - Or search for an address
   - Or tap "📍 Use Current Location"
4. Adjust the radius slider (100m - 5000m)
5. Toggle "Enable Alarm" on/off
6. Optionally enable "Disable After Trigger"
7. Tap "Create Alarm"

### Editing an Alarm
1. Tap any alarm from the home screen
2. Modify the name, location, radius, or settings
3. Tap "Save Changes"
4. Or tap "Delete Alarm" to remove it

### Settings
- Change distance unit (meters/kilometers)
- Request location and notification permissions
- View app information

## 🔧 Troubleshooting

### If the QR code doesn't work:
1. **Check your terminal** - Make sure the server is running
2. **Try tunnel mode**: In terminal, press `s` to switch to tunnel mode, then scan the new QR code
3. **Manual entry**: In Expo Go, tap "Enter URL manually" and enter: `exp://192.168.1.2:8081`
4. **Check firewall**: Make sure Windows Firewall allows Node.js on port 8081

### If you get "Unable to connect":
1. Make sure phone and laptop are on the same Wi-Fi
2. Try tunnel mode (press `s` in terminal)
3. Check that the Expo server is still running

### If the app crashes or has errors:
1. Check the terminal for error messages
2. Make sure all permissions are granted (location, notifications)
3. Try restarting the Expo server: Stop it (Ctrl+C) and run `npx expo start --clear` again

### If maps don't load:
- Maps require Google Maps API key for full functionality
- In Expo Go, basic map functionality should work
- For production, you'll need to configure Google Maps API

## 🎯 Testing the Prototype

### Test Scenarios:
1. **Create an alarm** near your current location
2. **Walk/drive** to that location to trigger the alarm
3. **Edit an alarm** to change its location or radius
4. **Toggle alarms** on and off
5. **Test settings** to change distance units

### Permissions Needed:
- **Location (Foreground)**: Required for selecting locations
- **Location (Background)**: Required for alarms to work when app is closed
- **Notifications**: Required for alarm alerts

The app will request these permissions when you first use location features.

## 📝 Current Server Status

- **Server URL**: `exp://192.168.1.2:8081`
- **QR Code**: Available in `qrcode.png` and in your terminal
- **Web Interface**: `http://localhost:19002`

## ✅ Everything is Ready!

Your GeoClock prototype is now fully functional and ready to test. The server is running, all files are in place, and all errors have been fixed. Simply scan the QR code with Expo Go to start using it!

