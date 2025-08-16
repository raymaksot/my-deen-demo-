// SplashScreen — реализовано по PNG-макету, с использованием Theme
import Theme from '../theme/theme'
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const SplashScreen = () => (
  <View style={styles.container}>
    {/* Логотип */}
    <View style={styles.logoContainer}>
      <Image source={require('../../assets/splash_dark.png')} style={styles.logo} />
      <Text style={styles.title}>MyDeen</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: Theme.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    ...Theme.typography.h2,
  color: Theme.palette.background,
  },
});

// Комментарий: SplashScreen полностью повторяет макет, использует цвета и типографику из Theme.

export default SplashScreen;
