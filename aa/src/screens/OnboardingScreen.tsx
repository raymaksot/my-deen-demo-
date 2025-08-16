// OnboardingScreen — реализовано по PNG-макету, с использованием Theme
import Theme from '../theme/theme'
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export const OnboardingScreen = () => (
  <View style={styles.container}>
    {/* Фоновое изображение */}
    <Image source={require('../../assets/onboarding_dark.png')} style={styles.background} />
    <View style={styles.overlay}>
      <Text style={styles.title}>Welcome to Nice Muslim</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur. Ultrices pellentesque ut rutrum nibh diam. Ullamcorper adipiscing ut iaculis amet urna id integer libero.
      </Text>
      <View style={styles.buttonGroup}>
        <Theme.elements.Button
          title="Sign Up with Google"
          variant="dark"
          style={styles.socialButton}
          onPress={() => {}}
          loading={false}
          disabled={false}
          // TODO: добавить иконку Google
        />
        <Theme.elements.Button
          title="Sign Up with Facebook"
          variant="dark"
          style={styles.socialButton}
          onPress={() => {}}
          loading={false}
          disabled={false}
          // TODO: добавить иконку Facebook
        />
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>
      <Theme.elements.Button
        title="Sign In with Email"
        variant="primary"
        style={styles.emailButton}
        onPress={() => {}}
        loading={false}
        disabled={false}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: Theme.palette.primary,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
  ...Theme.typography.h3,
  color: Theme.palette.background,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
  ...Theme.typography.paragraph,
  color: Theme.palette.background,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  socialButton: {
  backgroundColor: Theme.palette.dark,
    marginBottom: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
  backgroundColor: Theme.palette.secondary,
    marginHorizontal: 8,
  },
  orText: {
  ...Theme.typography.label,
  color: Theme.palette.secondary,
  },
  emailButton: {
  backgroundColor: Theme.palette.primary,
    marginTop: 8,
  },
});

// Комментарий: OnboardingScreen повторяет макет, использует Theme для типографики, цветов и кнопок. Для иконок Google/Facebook рекомендуется использовать Theme.elements.Icon.
