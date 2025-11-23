# Quick Start Guide - GeoClock

## ⚡ Get Started in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

### Step 3: Open App
**Option A - Web Browser (Testing)**
```bash
Press 'w' in terminal
# or
npm run web
```

**Option B - Mobile (Full Testing)**
```bash
Scan QR code with:
- iPhone: Camera app
- Android: Expo Go app
```

**Option C - Android Emulator**
```bash
npm run android
```

**Option D - iOS Simulator (Mac only)**
```bash
npm run ios
```

---

## 🎯 Create Your First Alarm

1. **Open App** in Expo Go or web browser
2. **Grant Permissions**
   - Tap "Settings"
   - Grant "Location Permission"
   - Grant "Notification Permission"
3. **Create Alarm**
   - Tap "+ Create Alarm"
   - Enter name (e.g., "Home", "Office")
   - Tap map to set location
   - Slide radius to 500m (example)
   - Tap "Create Alarm"
4. **Test**
   - Walk/drive toward the location
   - When within 500m, notification appears! 🎯

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Location not working | Grant location permission in Settings |
| Notifications not showing | Grant notification permission in Settings |
| App won't start | Run `npm install` then `npm start` |
| Map doesn't show | Normal in web; use Expo Go on mobile |
| Alarm won't trigger | Check location permission is "While Using" |

---

## 📊 What Each Screen Does

### 🏠 Home Screen
- **Lists all your alarms**
- Toggle switch to enable/disable
- Trash icon to delete
- Pull down to refresh
- "+ Create Alarm" button to add new

### ➕ Create Alarm Screen
- **Name** - Give your alarm a memorable name
- **Location** - Tap map to pick where alarm triggers
- **Radius** - Slider from 100m to 5000m
- **Create** - Save alarm

### ⚙️ Settings Screen
- Request location permission
- Request notification permission
- View app info

---

## 📍 How It Works

**The Magic:** While the app is open, it checks your location every 5 seconds. When you're within the alarm's radius, it sends a notification! 🎯

**The Science:** Uses Haversine formula to calculate exact distance between you and alarm location.

**Smart Alerts:** Won't spam you - only notifies once per visit!

---

## 🐛 Debug Tips

### See Live Logs
Open Expo DevTools (press `j` in terminal) or check browser console.

### Look for Messages Like:
```
✅ Foreground geofence monitoring started
🎯 Geofence triggered for: Home (245m away)
📍 Left geofence for: Home
```

---

## 💾 Your Data

All alarms are **saved locally** on your device using AsyncStorage. No cloud needed!

Alarms survive app restart.

---

## 🚀 Ready to Ship?

When ready for production:

1. Update `app.json` with your app details
2. Add Google Maps API key for Android maps
3. Configure Apple location permissions
4. Build with `eas build` (requires EAS account)
5. Submit to App Store / Google Play

---

**Questions?** Check console logs and verify permissions in device settings.
