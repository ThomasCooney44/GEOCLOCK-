# Quick Setup Guide

## For Local Development

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the App
```bash
npm start
```

This will:
- Start the Expo development server
- Show a QR code you can scan with Expo Go app
- Open the Expo DevTools in your browser

### Step 3: Run on Your Device
1. Install **Expo Go** app on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from the terminal or browser

## For GitHub Codespaces

1. Click the green "Code" button on your GitHub repository
2. Select "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for the environment to set up (it will automatically run `npm install`)
5. Open a terminal in Codespaces and run:
   ```bash
   npm start
   ```
6. In the "Ports" tab, find port 8081 and click "Public" to make it accessible
7. Copy the public URL and use it with Expo Go app's "Enter URL manually" option

## Troubleshooting

### If npm install fails:
```bash
npm cache clean --force
npm install
```

### If Expo won't start:
```bash
npx expo start -c
```
(The `-c` flag clears the cache)

### If you see port conflicts:
```bash
npx expo start --port 8082
```

## Testing the App

Once connected:
1. Grant location permissions when prompted
2. Grant notification permissions when prompted
3. Create an alarm by tapping the "+" button
4. Pick a location on the map
5. Set a distance radius
6. Save the alarm
7. The app will monitor your location and notify you when you're within range

