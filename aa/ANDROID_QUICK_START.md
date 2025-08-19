# Android Development Setup - Quick Start

This is a quick reference guide for the Android development environment setup for the MyDeen React Native (Expo) application.

## 🚀 Quick Start Commands

```bash
# 1. Clone and navigate to the app
cd aa/

# 2. Check your environment
npm run check-android-env

# 3. Install dependencies
npm install --legacy-peer-deps

# 4. Create environment file
cp .env.example .env
# Edit .env with your specific values

# 5. Start development server
npx expo start --clear
```

## 📋 Pre-flight Checklist

Before connecting your Android device:

- [ ] Node.js v18+ installed (`node -v`)
- [ ] npm installed (`npm -v`)  
- [ ] Expo CLI available (`npx expo --version`)
- [ ] Java JDK 17 installed (`java -version`)
- [ ] ADB installed (`adb version`)
- [ ] Android device in Developer Mode
- [ ] USB Debugging enabled on device
- [ ] Device connected and recognized (`adb devices`)

## 🔧 Common Issues

**Dependencies conflict?** Use `npm install --legacy-peer-deps`

**Device not recognized?** 
- Enable USB Debugging in Developer Options
- Try different USB cable
- Restart ADB: `adb kill-server && adb start-server`

**Can't connect to backend?**
- Use your computer's IP address in .env (not localhost)
- Ensure backend is running on the specified port
- Check firewall settings

## 📚 Full Documentation

For complete setup instructions, troubleshooting, and debugging guides:

👉 **[docs/ANDROID_DEVICE_SETUP.md](docs/ANDROID_DEVICE_SETUP.md)**

---

**Need help?** Run `npm run check-android-env` to diagnose your setup automatically.