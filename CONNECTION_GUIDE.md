# GeoClock Connection Guide

## Current Setup
- **Server Mode**: Tunnel (most reliable)
- **Connection**: Through Expo's servers (works even with network restrictions)

## Steps to Connect:

### 1. Wait for Tunnel to Initialize
- The tunnel takes 30-60 seconds to establish
- Look at your terminal - you should see "Tunnel ready" or similar message
- A new QR code will appear in the terminal

### 2. Scan the NEW QR Code
- **Important**: Use the QR code that appears in your TERMINAL, not the old qrcode.png file
- The tunnel QR code will have a different URL (like `exp://u.expo.dev/...`)

### 3. Alternative: Web Interface
- Open your browser and go to: `http://localhost:19002`
- This shows the Expo Dev Tools with connection options
- You can see the QR code there and also try different connection modes

### 4. If Still Having Issues:

**Option A: Try LAN Mode**
1. Stop the server (Ctrl+C in terminal)
2. Run: `npx expo start --lan`
3. Make sure phone and laptop are on same Wi-Fi
4. Scan the QR code

**Option B: Manual URL Entry**
1. Open Expo Go app
2. Tap "Enter URL manually"
3. Enter the URL shown in your terminal (it will be different for tunnel mode)

**Option C: Check Error Details**
- What exact error message do you see in Expo Go?
- Common errors:
  - "Unable to connect" = Network/firewall issue
  - "Metro bundler error" = Code issue, check terminal
  - "Timeout" = Server not running or network issue

## What Error Are You Seeing?
Please tell me the exact error message from Expo Go so I can help troubleshoot!

