# 🚀 Quick Start Guide

## Run the App Right Now (Local)

1. **Open a terminal** in your project folder:
   ```powershell
   cd "C:\Users\thoma\OneDrive\Desktop\geoclock"
   ```

2. **Start the app**:
   ```powershell
   npm start
   ```

3. **You'll see**:
   - A QR code in the terminal
   - Expo DevTools opening in your browser
   - Options to press `a` for Android, `i` for iOS, or `w` for web

4. **To test on your phone**:
   - Install **Expo Go** app from App Store (iOS) or Google Play (Android)
   - Scan the QR code with:
     - **iOS**: Use the Camera app
     - **Android**: Use the Expo Go app's scanner

5. **To test in browser**:
   - Press `w` in the terminal, or
   - Run `npm run web` in a new terminal

## Run in GitHub Codespaces

1. **Push to GitHub first** (see GITHUB_SETUP.md)

2. **Open in Codespaces**:
   - Go to your GitHub repository
   - Click "Code" → "Codespaces" → "Create codespace on main"

3. **Wait for setup** (automatic)

4. **Start the app**:
   ```bash
   npm start
   ```

5. **Access the dev server**:
   - Go to "Ports" tab in Codespaces
   - Make port 8081 public
   - Use the public URL with Expo Go app

## Common Commands

```bash
npm start          # Start Expo dev server
npm run web        # Run in web browser
npm run android    # Run on Android (requires emulator/device)
npm run ios        # Run on iOS (macOS only, requires simulator)
```

## Need Help?

- Check `SETUP.md` for detailed setup instructions
- Check `GITHUB_SETUP.md` for GitHub repository setup
- Check `README.md` for full documentation

