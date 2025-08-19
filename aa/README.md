# MyDeen Mobile (Expo)

New features:
- Comments and likes for articles and Q&A answers
- Reading groups (khatma circles): create/join groups, assignments/progress, simple chat
- Events: list, details, RSVP/cancel, local reminders
- Admin dashboard placeholder (requires `admin` role)
- Notification preferences (events, articles, group milestones)
- Accessibility: font scaling toggle, high-contrast toggle

Configuration:
- Set `EXPO_PUBLIC_API_BASE_URL` in `.env` pointing to backend (default `http://10.0.2.2:3000` for Android emulator)

Running:
- Install deps: `npm install --legacy-peer-deps`
- Start: `npx expo start`

## 📚 Documentation

- [Android Quick Start](ANDROID_QUICK_START.md) - Quick setup checklist for Android development
- [Android Device Setup & Debug Guide](docs/ANDROID_DEVICE_SETUP.md) - Complete guide for testing and debugging on Android devices
- [iOS Deployment Changes](IOS_DEPLOYMENT_CHANGES.md) - iOS-specific deployment configuration
- [NetInfo Integration](docs/NetInfo_Integration.md) - Network connectivity monitoring

Notes:
- Comments UI is reusable component at `src/components/CommentsThread.tsx`
- New screens: `src/screens/groups/*`, `src/screens/events/*`, `src/screens/admin/AdminDashboardScreen.tsx`