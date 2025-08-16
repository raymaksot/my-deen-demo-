import Theme, { useThemeConfig } from '../../theme/theme';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

// Определяем типы навигации для профиля
export type ProfileStackParamList = {
  Location: undefined;
  EditProfile: undefined;
  Language: undefined;
  Profile: undefined;
};

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList, 'Location'>;
}

const LocationScreen: React.FC<Props> = ({ navigation }) => {
  const [address, setAddress] = useState('Al Maktoum St, Dubai, UAE');
  const { palette } = useThemeConfig();
  const styles = getStyles(palette);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: palette.surface }]}>←</Text>
        </TouchableOpacity>
  <Text style={[Theme.typography.h4, { color: palette.surface }]}>My Location</Text>
      </View>
      <View style={styles.mapBox}>
  <Image source={require('../../../assets/my_location.png')} style={styles.mapImg} />
      </View>
      <View style={styles.addressBox}>
  <Text style={[Theme.typography.label, { color: palette.text }]}>Current Address</Text>
  <Text style={[Theme.typography.h5, { color: palette.text, marginTop: 8 }]}>{address}</Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={[Theme.typography.h5, { color: palette.surface }]}>Change Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const getStyles = (palette: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background || '#FFFFFF',
  },
  header: {
    height: 80,
    backgroundColor: palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 16,
  },
  mapBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mapImg: {
    width: 320,
    height: 180,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  addressBox: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  changeBtn: {
    backgroundColor: palette.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    width: '100%',
  },
});

export default LocationScreen;