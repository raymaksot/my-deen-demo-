import Theme, { useThemeConfig } from '../../theme/theme';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setThemeMode } from '@/store/preferencesSlice';
import { logout } from '@/store/authSlice';

const settings = [
  { id: 1, label: 'Account Preferences', icon: '👤' },
  { id: 2, label: 'My Location', icon: '📍' },
  { id: 3, label: 'Language', icon: '🌐' },
  { id: 4, label: 'Dark Mode', icon: '🌙', switch: true },
];
const other = [
  { id: 5, label: 'Contact Support', icon: '💬' },
  { id: 6, label: 'Logout', icon: '🚪', danger: true },
];

/**
 * ProfileScreen shows the logged‑in user’s information and provides links to
 * account settings such as editing the profile, changing language, selecting
 * location and toggling dark mode.  A logout option is also provided.
 */
function ProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAppSelector((s) => s.auth.user);
  const prefs = useAppSelector((s) => s.preferences);
  const dispatch = useAppDispatch();
  const { palette } = useThemeConfig();
  const [darkMode, setDarkMode] = useState(prefs.themeMode === 'dark');

  function toggleTheme() {
    setDarkMode((prev) => !prev);
    dispatch(setThemeMode(darkMode ? 'light' : 'dark'));
  }

  const styles = getStyles(palette);

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
  <Image source={require('../../../assets/homepage.png')} style={styles.bannerImage} />
        <View style={styles.bannerOverlay} />
        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={[Theme.typography.h4, { color: palette.surface }]}>⚙️</Text>
        </TouchableOpacity>
        <View style={styles.profileCard}>
          <Image source={require('../../../assets/signin_dark.png')} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={[Theme.typography.h5, { color: palette.surface }]}>{user?.name || 'Guest'}</Text>
            <Text style={[Theme.typography.label, { color: palette.surface }]}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}><Text style={[Theme.typography.h4, { color: palette.surface }]}>✎</Text></TouchableOpacity>
        </View>
      </View>
      {/* Settings List */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={[Theme.typography.label, { color: palette.text, marginHorizontal: 16, marginTop: 24 }]}>Account Settings</Text>
        {settings.map((s) => (
          <View key={s.id} style={styles.settingRow}>
            <Text style={[Theme.typography.h5, { marginRight: 12 }]}>{s.icon}</Text>
            <Text style={[Theme.typography.h5, { flex: 1, color: palette.text }]}>{s.label}</Text>
            {s.switch ? (
              <Switch value={darkMode} onValueChange={toggleTheme} trackColor={{ false: palette.surface, true: palette.primary }} thumbColor={darkMode ? palette.surface : palette.secondary} />
            ) : null}
          </View>
        ))}
        <Text style={[Theme.typography.label, { color: palette.text, marginHorizontal: 16, marginTop: 24 }]}>Other</Text>
        {other.map((o) => (
          <View key={o.id} style={[styles.settingRow, o.danger && { borderColor: palette.error, borderWidth: 1 }] }>
            <Text style={[Theme.typography.h5, { marginRight: 12, color: o.danger ? palette.error : palette.text }]}>{o.icon}</Text>
            <Text style={[Theme.typography.h5, { flex: 1, color: o.danger ? palette.error : palette.text }]}>{o.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

function getStyles(palette: any) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background || '#FFFFFF',
  },
  banner: {
    height: 180,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  settingsBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 2,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: -32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    resizeMode: 'cover',
  },
  editBtn: {
    marginLeft: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  });
}