import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Theme } from '@/theme/theme';
import { login, googleLogin } from '@/store/authSlice';
import * as Google from 'expo-auth-session/providers/google';
import { ENV } from '@/config/env';
import { useThemeColors } from '@/theme/theme';
import { PrimaryButton, SecondaryButton, TextInputField } from '@/components/common';
import Constants from "expo-constants";
export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.auth.status);
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // Проверка на null/undefined для expoConfig и extra
  const androidClientId = Constants.expoConfig?.extra?.googleAndroidClientId ?? '';
  const [request, response, promptAsync] = Google.useAuthRequest({ webClientId: ENV.googleWebClientId, androidClientId });
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

// ...existing code...

type ThemeColors = {
  background: string;
  muted: string;
  border: string;
  primary: string;
  card: string;
  text: string;
};
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
    backgroundColor: colors.background || '#FFFFFF',
    },
    form: {
      width: '100%',
    },
    forgot: {
      color: colors.muted,
      textAlign: 'right',
      marginTop: -4,
      marginBottom: 16,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    divider: {
      backgroundColor: colors.border,
    },
    link: {
      color: colors.primary,
      fontWeight: '600',
    },
    modalWrap: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    modalCard: {
    backgroundColor: colors.background || '#FFFFFF',
      borderRadius: 12,
      padding: 24,
      width: '100%',
      maxWidth: 320,
      alignItems: 'center',
    },
    toastContainer: {
      position: 'absolute',
      bottom: 32,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    toast: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 24,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    toastText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
    },
    toastIcon: {
      color: '#10b981',
      fontSize: 16,
      fontWeight: '700',
      marginRight: 8,
    },
  });
}

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      if (idToken) dispatch(googleLogin(idToken));
    }
  }, [response]);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) return;
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setShowSuccess(true);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          {/* Email */}
          <Theme.elements.Input
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 12 }}
            disabled={false}
          />
          {/* Password */}
          <Theme.elements.Input
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={{ marginBottom: 12 }}
            disabled={false}
          />
          <TouchableOpacity onPress={() => { /* TODO: navigate to forgot password */ }}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* Кнопка входа */}
          <Theme.elements.Button
            title="Sign In"
            onPress={handleLogin}
            style={{ marginTop: 8, opacity: !email || !password ? 0.5 : 1 }}
            loading={status === 'loading'}
            disabled={!email || !password}
          />
          {/* Кнопки соцсетей */}
          <Theme.elements.Button
            title="Sign Up with Google"
            onPress={() => promptAsync()}
            variant="dark"
            style={{ marginBottom: 12 }}
            loading={false}
            disabled={false}
          />
          <Theme.elements.Button
            title="Sign Up with Facebook"
            onPress={() => {}}
            variant="dark"
            style={{ marginBottom: 12 }}
            loading={false}
            disabled={false}
          />
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={[{ marginHorizontal: 8 }, { color: colors.muted }]}>Or</Text>
            <View style={styles.divider} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <Text style={{ color: colors.text }}>Doesn’t have an account?</Text>
            <Text onPress={() => navigation.navigate('Register')} style={styles.link}> Register Now</Text>
          </View>
        </View>

        <Modal visible={showSuccess} transparent animationType="fade">
          <View style={styles.modalWrap}>
            <View style={styles.modalCard}>
              <Text style={[Theme.typography.h5, { color: colors.text }]}>Sign In Success</Text>
              <Text style={[Theme.typography.paragraph, { color: colors.text }]}>Successfully signed in</Text>
              <PrimaryButton
                title="Continue"
                onPress={() => setShowSuccess(false)}
              />
            </View>
          </View>
        </Modal>

        {/* Transient toast to indicate sign in success. Positioned at the bottom of the screen and
            automatically dismissed after a few seconds. */}
        {showToast && (
          <View style={styles.toastContainer}>
            <View style={[styles.toast, { backgroundColor: colors.card }] }>
              <Text style={[styles.toastIcon, { color: '#10b981' }]}>✓</Text>
              <Text style={[styles.toastText, { color: colors.text }]}>Successfully signed in</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
