// ПРОБЛЕМА: [runtime not ready]: TypeError: Cannot read property 'background' of undefined, js engine: hermes
// Причина: объект themeColors был undefined, а попытка обращения к themeColors.background приводила к ошибке.
// Решение: добавлена защита — если themeColors не определён, используются дефолтные цвета (см. переменную colors).
// Это предотвращает ошибку при запуске на Hermes и других движках JS.
// Стек ошибки:
// anonymous@197971:42
// loadModuleImplementation@260:13 guardedLoadModule@168:37 metroRequire@88:91 anonymous@162501:57
// ... (см. подробности выше)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@/theme/theme';
import { register, googleLogin } from '@/store/authSlice';
import * as Google from 'expo-auth-session/providers/google';
import { ENV } from '@/config/env';
import { useThemeColors } from '@/theme/theme';
import Constants from "expo-constants";

function RegisterScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const themeColors = useThemeColors();
  // Защита: если themeColors не определён, используем дефолтные цвета
  const colors = themeColors ?? {
    background: '#FFFFFF',
    text: '#111111',
    primary: '#0E7490',
    card: '#F5F7FA',
    border: '#E5E7EB',
    muted: '#6B7280',
    surface: '#F5F5F5',
    secondary: '#979797',
    secondary2: '#9A9B9B',
    secondary3: '#BCBCD4',
    textSecondary: '#797979',
    error: '#3D5BF6',
    error2: '#AAAFBE',
    error3: '#D4D7DF',
    warning: '#4CD964',
    success: '#E04124',
    success2: '#EF907F',
    success3: '#F9BCB1',
    dark: '#0B0F0E',
    dark2: '#1D2322',
    dark3: '#313736',
  };
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Google Auth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: ENV.googleWebClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken: string) => {
    try {
      setIsLoading(true);
      const resultAction = await dispatch(googleLogin(idToken));
      unwrapResult(resultAction);
      setShowSuccess(true);
    } catch (error) {
      // обработка ошибки
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      // ваш код регистрации
      setShowSuccess(true);
    } catch (error) {
      // обработка ошибки
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={[Theme.typography.h4, { color: colors.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>Register Account</Text>
        </View>
        <View style={styles.form}>
          {/* Full Name */}
          <Text style={[Theme.typography.label, { color: colors.text, marginBottom: 4, marginTop: 12 }]}>Full Name</Text>
          <Theme.elements.Input
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            style={{ marginBottom: 8 }}
            disabled={false}
          />
          {/* Email */}
          <Text style={[Theme.typography.label, { color: colors.text, marginBottom: 4, marginTop: 12 }]}>Email</Text>
          <Theme.elements.Input
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 8 }}
            disabled={false}
          />
          {/* Password */}
          <Text style={[Theme.typography.label, { color: colors.text, marginBottom: 4, marginTop: 12 }]}>Password</Text>
          <Theme.elements.Input
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={{ marginBottom: 8 }}
            disabled={false}
          />
          {/* Чекбокс согласия */}
          <View style={styles.checkboxRow}>
            <Theme.elements.Checkbox checked={agree} onChange={setAgree} style={{ marginRight: 8 }} disabled={false} />
            <Text style={[Theme.typography.paragraph, { color: colors.secondary }]}>I agree to the T&Cs and the processing of information as set out in the Privacy Policy.</Text>
          </View>
          {/* Кнопка регистрации */}
          <Theme.elements.Button
            title="Sign Up"
            onPress={handleRegister}
            disabled={!name || !email || !password || !agree || isLoading}
            loading={isLoading}
            style={{ marginTop: 8 }}
          />
          {/* Разделитель */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={[Theme.typography.label, { color: colors.secondary, marginHorizontal: 8 }]}>Or</Text>
            <View style={styles.divider} />
          </View>
          {/* Кнопки соцсетей */}
          <Theme.elements.Button
            title="Sign Up with Google"
            onPress={() => promptAsync()}
            variant="surface"
            style={{ marginBottom: 12 }}
            loading={false}
            disabled={false}
          />
          <Theme.elements.Button
            title="Sign Up with Facebook"
            onPress={() => {}}
            variant="surface"
            style={{ marginBottom: 12 }}
            loading={false}
            disabled={false}
          />
          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <Text style={[Theme.typography.paragraph, { color: colors.secondary }]}>Already have an account?
              <Text onPress={() => navigation.navigate('Login')} style={[Theme.typography.label, { color: colors.primary }]}> Sign in</Text>
            </Text>
          </View>
        </View>
        {/* Модальное окно успеха */}
        <Modal visible={showSuccess} transparent animationType="fade">
          <View style={styles.modalWrap}>
            <View style={styles.modalCard}>
              <Text style={[Theme.typography.h4, { color: colors.text, marginBottom: 8 }]}>Create Account Success</Text>
              <Text style={[Theme.typography.paragraph, { textAlign: 'center', color: colors.secondary, marginBottom: 16 }]}>You have created your account. Please login to enjoy our features right now!</Text>
              <Theme.elements.Button
                title="Login Now"
                onPress={() => {
                  setShowSuccess(false);
                  navigation.navigate('Login');
                }}
                style={{ marginTop: 8 }}
                loading={false}
                disabled={false}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;


const createStyles = (colors: { [key: string]: string }) => {
  return StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
      backgroundColor: colors.background || '#FFFFFF',
    },
    navRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    backBtn: {
      padding: 4,
      marginRight: 8,
    },
    header: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    form: {
      width: '100%',
    },
    label: {
      marginBottom: 4,
      marginTop: 12,
      fontWeight: '600',
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 8,
      fontSize: 16,
      backgroundColor: (colors.background || '#FFFFFF') === '#0B1220' ? '#1F2937' : '#f9fafb',
      color: colors.text,
    },
    inputFilled: {
      borderColor: colors.primary,
      backgroundColor: (colors.background || '#FFFFFF') === '#0B1220' ? '#0E3b47' : '#ecfdf5',
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    checkboxLabel: {
      flex: 1,
      flexWrap: 'wrap',
      color: colors.muted,
    },
    primaryBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    primaryBtnDisabled: {
      backgroundColor: colors.primary + '40',
    },
    primaryText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    socialBtn: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: (colors.background || '#FFFFFF') === '#0B1220' ? '#1F2937' : '#fff',
    },
    socialText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
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
  });
}