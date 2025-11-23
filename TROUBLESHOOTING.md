# GeoClock Connection Troubleshooting

## If you're getting "Request Timeout" error:

### 1. Check Windows Firewall
The firewall might be blocking port 8081. To fix:
- Open Windows Defender Firewall
- Click "Allow an app or feature through Windows Defender Firewall"
- Find "Node.js" and make sure both "Private" and "Public" are checked
- If Node.js isn't listed, click "Allow another app" and add it

### 2. Verify Same Wi-Fi Network
- Make sure your phone and laptop are on the **exact same Wi-Fi network**
- Some routers have "Guest Network" isolation - make sure both devices are on the main network

### 3. Try Tunnel Mode (More Reliable)
Instead of LAN mode, use tunnel mode which works through Expo's servers:
```bash
npx expo start --tunnel
```
This will generate a different QR code that works even if your network has restrictions.

### 4. Check Expo Server Status
- Look at your terminal where `npm start` is running
- You should see a QR code displayed
- The terminal will show connection URLs

### 5. Manual Connection
If QR code doesn't work:
1. Open Expo Go app on your phone
2. Tap "Enter URL manually"
3. Enter: `exp://192.168.1.2:8081`
   (Replace with your actual IP if different)

### 6. Alternative: Use Expo Dev Tools Web Interface
- When Expo starts, it usually opens a web page at `http://localhost:19002`
- From there, you can see the QR code and connection options
- You can also try the "Tunnel" option from the web interface

### 7. Restart Everything
1. Stop the Expo server (Ctrl+C in terminal)
2. Restart it: `npm start`
3. Make sure your phone's Expo Go app is closed and reopened
4. Try scanning again

