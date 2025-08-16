import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../theme/theme';
import { useThemeColors } from '../../theme/theme';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji placeholder
  link?: string;
}

const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Now is Dhuhr Time!',
    description: 'Find a clean and quiet place to pray, facing towards the Qiblah.',
    icon: '☀️',
    link: 'Locate Qiblah',
  },
  {
    id: 'n2',
    title: 'Tomorrow is Ramadhan',
    description: 'Ramadan is coming, prepare your self to be better in this year.',
    icon: '🌙',
  },
  {
    id: 'n3',
    title: 'Subscription Renewal',
    description: 'You have make a renewal subscription, you can see the receipt in your e-wallet app.',
    icon: '💳',
  },
  {
    id: 'n4',
    title: 'Now is Asr Time',
    description: 'Find a clean and quiet place to pray, facing towards the Qiblah.',
    icon: '🌅',
  },
];

export default function NotificationScreen() {
  const navigation = useNavigation<any>();
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[Theme.typography.h4, { color: colors.text }]}>Notification</Text>
        <TouchableOpacity onPress={() => {}} style={styles.settingsBtn}>
          {/* TODO: добавить иконку настроек через Theme.elements.Icon */}
          <Text style={[Theme.typography.h4, { color: colors.text }]}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <Text style={[Theme.typography.label, { color: colors.secondary, marginTop: 16 }]}>Today</Text>
      {notifications.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.iconCircle}>
            {/* TODO: заменить emoji на Theme.elements.Icon */}
            <Text style={[Theme.typography.h4]}>{item.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[Theme.typography.h6, { color: colors.text }]}>{item.title}</Text>
            <Text style={[Theme.typography.paragraph, { color: colors.secondary }]}>{item.description}</Text>
            {item.link && <Text style={[Theme.typography.label, { color: colors.primary }]}>{item.link}</Text>}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// Build a dynamic style sheet based on the current theme colours.  Cards
// and background colours adjust automatically when switching modes.
function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background || '#FFFFFF',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.surface,
    },
    backBtn: {
      marginRight: 12,
    },
    settingsBtn: {
      marginLeft: 12,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 16,
      marginVertical: 8,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
  });
}