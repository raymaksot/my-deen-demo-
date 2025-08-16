import { Theme } from '../../theme/theme';
import { useThemeColors } from '../../theme/theme';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from './LocationScreen';

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList, 'Language'>;
}

const languages = [
  { code: 'en', label: 'English', icon: require('../../../assets/language.png') },
  { code: 'ar', label: 'Arabic', icon: require('../../../assets/language.png') },
  { code: 'ru', label: 'Russian', icon: require('../../../assets/language.png') },
];

const LanguageScreen: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState('en');
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: colors.surface }]}>←</Text>
        </TouchableOpacity>
        <Text style={[Theme.typography.h4, { color: colors.surface }]}>Language</Text>
      </View>
      <ScrollView style={styles.listBox}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.langRow, selected === lang.code && { borderColor: colors.primary, borderWidth: 2 }]}
            onPress={() => setSelected(lang.code)}
          >
            <Image source={lang.icon} style={styles.langIcon} />
            <Text style={[Theme.typography.h5, { flex: 1, color: colors.text }]}>{lang.label}</Text>
            {selected === lang.code && <Text style={[Theme.typography.h5, { color: colors.primary }]}>✔</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={[Theme.typography.h5, { color: colors.surface }]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background || '#FFFFFF',
    },
    header: {
      height: 80,
      backgroundColor: colors.primary,
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
    listBox: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    langRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    langIcon: {
      width: 32,
      height: 32,
      marginRight: 12,
      resizeMode: 'contain',
    },
    saveBtn: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      marginHorizontal: 24,
      elevation: 2,
    },
  });
}

export default LanguageScreen;