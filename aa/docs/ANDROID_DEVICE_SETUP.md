# 📱 React Native (Expo) – Android Device Setup & Debug Guide

This guide provides step-by-step instructions to test, debug, and successfully run your **React Native (Expo)** application on a **physical Android device**.  

---

## 1. 🔍 Environment Check

Verify that your environment is correctly configured:

```bash
node -v          # Check Node.js version
npm -v           # Check npm version
npx expo --version   # Check Expo CLI version
java -version    # Check Java JDK version
adb version      # Check Android Debug Bridge version
```

### Quick Environment Check Script

For convenience, you can run our automated environment check script:

```bash
# From the aa/ directory
npm run check-android-env

# Or run directly
./scripts/check-android-env.sh
```

This script will verify all requirements and provide specific guidance for missing tools.

### Expected Output Example:
```bash
$ node -v
v20.19.4

$ npm -v
10.8.2

$ npx expo --version
0.24.20

$ java -version
openjdk version "17.0.16" 2025-07-15
OpenJDK Runtime Environment Temurin-17.0.16+8 (build 17.0.16+8)

$ adb version
Android Debug Bridge version 1.0.41
```

---

## 2. 📦 Install Required Tools

### Install Android Debug Bridge (ADB)

**On macOS:**
```bash
brew install android-platform-tools
```

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install android-tools-adb android-tools-fastboot
```

**On Windows:**
1. Download Android SDK Platform Tools from [developer.android.com](https://developer.android.com/studio/releases/platform-tools)
2. Extract to a folder (e.g., `C:\platform-tools`)
3. Add the folder to your system PATH

**Verify ADB Installation:**
```bash
adb version
adb devices  # Should list connected devices
```

---

## 3. 📱 Android Device Configuration

### Enable Developer Options & USB Debugging

1. **Open Settings** on your Android device
2. **Go to About Phone** (or About Device)
3. **Tap "Build Number" 7 times** until you see "You are now a developer!"
4. **Go back to Settings** → **Developer Options**
5. **Enable "USB Debugging"**
6. **Enable "Install via USB"** (if available)
7. **Enable "USB Debugging (Security Settings)"** (if available)

### Additional Recommended Settings:
- **Stay Awake**: Keep screen on while charging
- **Select USB Configuration**: Choose "File Transfer" or "MTP"
- **Disable MIUI Optimization** (on Xiaomi devices)
- **Allow from Unknown Sources** (in Security settings)

---

## 4. 🔌 Connect & Verify Device

### Connect Your Device

1. **Connect your Android device** to your computer via USB cable
2. **Allow USB Debugging** when prompted on the device
3. **Verify connection:**

```bash
adb devices
```

**Expected Output:**
```bash
List of devices attached
XXXXXXXXXX      device
```

If you see "unauthorized", check your device for a USB debugging authorization prompt.

### Test ADB Connection

```bash
# Check device info
adb shell getprop ro.product.model
adb shell getprop ro.build.version.release

# Install app (for testing)
adb install path/to/app.apk

# View device logs
adb logcat
```

---

## 5. 🚀 Running the MyDeen App

### Start the Development Server

```bash
cd aa  # Navigate to the app directory
npm install  # Install dependencies
npx expo start --clear  # Start with cleared cache
```

### Connect Your Device

**Option 1: Scan QR Code**
1. Install **Expo Go** app from Google Play Store
2. Open Expo Go app
3. Scan the QR code from your terminal/browser

**Option 2: Direct Connection (Recommended for Development)**
1. Press `a` in the terminal to open on Android
2. Or use: `npx expo run:android`

### Environment Configuration

Ensure your `.env` file is properly configured:

```bash
# .env file
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000  # Your local IP
GOOGLE_WEB_CLIENT_ID=your-google-web-client-id
GOOGLE_ANDROID_CLIENT_ID=your-google-android-client-id
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

**Note:** Use your computer's IP address, not `localhost` or `127.0.0.1`, when testing on a physical device.

---

## 6. 🐛 Debugging & Development

### Enable Remote Debugging

1. **Shake your device** or press `Ctrl+M` (or `Cmd+M` on macOS) to open developer menu
2. Select **"Debug"** → **"Open Debugger"**
3. This opens Chrome DevTools for JavaScript debugging

### View Device Logs

```bash
# View all logs
adb logcat

# Filter React Native logs
adb logcat | grep -i "ReactNativeJS"

# Filter by app package
adb logcat | grep com.mydeen.app

# Clear logs and view fresh
adb logcat -c && adb logcat
```

### Performance Monitoring

```bash
# Monitor app performance
adb shell top | grep com.mydeen.app

# Monitor memory usage
adb shell dumpsys meminfo com.mydeen.app
```

---

## 7. 🔧 Common Issues & Solutions

### Device Not Recognized

**Problem:** `adb devices` shows no devices or "unauthorized"

**Solutions:**
1. **Enable USB Debugging** in Developer Options
2. **Change USB connection mode** to "File Transfer" (MTP)
3. **Revoke USB debugging authorizations** in Developer Options, then reconnect
4. **Try a different USB cable** (ensure it supports data transfer)
5. **Restart ADB server:**
   ```bash
   adb kill-server
   adb start-server
   adb devices
   ```

### Metro Bundle Error

**Problem:** "Unable to resolve module" or "Metro bundler error"

**Solutions:**
```bash
# Clear all caches
npx expo start --clear

# Reset Metro bundler
npx expo r -c

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Network Connection Issues

**Problem:** App can't connect to backend server

**Solutions:**
1. **Check your IP address:**
   ```bash
   # On macOS/Linux
   ifconfig | grep inet
   
   # On Windows
   ipconfig
   ```
2. **Update EXPO_PUBLIC_API_BASE_URL** in `.env` with correct IP
3. **Ensure backend server is running** on the specified port
4. **Check firewall settings** - allow connections on your development port

### Permission Issues

**Problem:** App crashes when requesting permissions (location, camera, etc.)

**Solutions:**
1. **Grant permissions manually** in Android Settings → Apps → MyDeen
2. **Check AndroidManifest.xml** for required permissions:
   ```xml
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.CAMERA" />
   ```
3. **Test permission requests** in development build

### Build Failures

**Problem:** `npx expo run:android` fails

**Solutions:**
1. **Ensure Java JDK 17** is installed and configured
2. **Check Android SDK path** in environment variables
3. **Clean and rebuild:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx expo run:android
   ```

---

## 8. 📋 Development Checklist

### Before Starting Development:
- [ ] Node.js (v18+) installed
- [ ] npm/yarn installed
- [ ] Expo CLI installed
- [ ] Java JDK 17 installed
- [ ] ADB installed and working
- [ ] Android device in Developer Mode
- [ ] USB Debugging enabled
- [ ] Device recognized by `adb devices`

### Testing Your Setup:
- [ ] Can connect device via ADB
- [ ] Expo development server starts successfully
- [ ] App loads on physical device
- [ ] Can access developer menu (shake device)
- [ ] Backend API connection works
- [ ] Required permissions are granted
- [ ] Debug logs are visible

### Production Ready:
- [ ] App builds successfully with `expo build:android`
- [ ] All features work without development server
- [ ] Proper signing certificates configured
- [ ] Performance is acceptable on target devices
- [ ] All permissions properly requested and handled

---

## 9. 🔗 Useful Commands Reference

### Development:
```bash
# Start development server
npx expo start --clear

# Run on Android device
npx expo run:android

# Build for production
eas build --platform android

# Install development build
npx expo install --dev-client
```

### ADB Commands:
```bash
# List connected devices
adb devices

# Install APK
adb install app.apk

# Uninstall app
adb uninstall com.mydeen.app

# View logs
adb logcat

# Copy files to/from device
adb push local_file /sdcard/
adb pull /sdcard/remote_file ./

# Open shell on device
adb shell
```

### Troubleshooting:
```bash
# Restart ADB
adb kill-server && adb start-server

# Clear Metro cache
npx expo start --clear

# Reset React Native cache
npx react-native start --reset-cache

# Check device properties
adb shell getprop
```

---

## 📞 Getting Help

If you encounter issues not covered in this guide:

1. **Check Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
2. **React Native Debugging**: [reactnative.dev/docs/debugging](https://reactnative.dev/docs/debugging)
3. **ADB Documentation**: [developer.android.com/studio/command-line/adb](https://developer.android.com/studio/command-line/adb)
4. **Community Support**: [forums.expo.dev](https://forums.expo.dev)

---

**Happy Debugging! 🚀**