import { Theme } from '../../theme/theme';
import { useThemeColors } from '../../theme/theme';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch } from 'react-native';
import React, { useState } from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const periods = [
  'January - December, 2023',
  'January - June, 2023',
  'July - December, 2023',
];
type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isa';

const notifications: { id: number; name: PrayerName; icon: string }[] = [
  { id: 1, name: 'Fajr', icon: '🌅' },
  { id: 2, name: 'Dhuhr', icon: '☀️' },
  { id: 3, name: 'Asr', icon: '☁️' },
  { id: 4, name: 'Maghrib', icon: '🌅' },
  { id: 5, name: 'Isa', icon: '🌙' },
];

const PrayerSettingsScreen: React.FC<Props> = ({ visible, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [notifStates, setNotifStates] = useState<Record<PrayerName, boolean>>({ Fajr: true, Dhuhr: false, Asr: true, Maghrib: true, Isa: false });
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHandle} />
          <Text style={[Theme.typography.h5, { marginBottom: 4 }]}>Prayer Settings</Text>
          <Text style={[Theme.typography.label, { color: colors.secondary, marginBottom: 16 }]}>Salat Period</Text>
          <TouchableOpacity style={styles.periodSelector}>
            <Text style={[Theme.typography.label, { color: colors.text }]}>{selectedPeriod}</Text>
            <Text style={[Theme.typography.h5, { color: colors.primary }]}>▼</Text>
          </TouchableOpacity>
          <Text style={[Theme.typography.label, { color: colors.secondary, marginTop: 24, marginBottom: 8 }]}>Notification</Text>
          {notifications.map((n) => (
            <View key={n.id} style={styles.notifRow}>
              <Text style={[Theme.typography.h5, { marginRight: 12 }]}>{n.icon}</Text>
              <Text style={[Theme.typography.h5, { flex: 1, color: colors.text }]}>{n.name}</Text>
              <Switch
                value={notifStates[n.name as PrayerName]}
                onValueChange={(v) => setNotifStates((s) => ({ ...s, [n.name as PrayerName]: v }))}
                trackColor={{ false: colors.surface, true: colors.primary }}
                thumbColor={notifStates[n.name as PrayerName] ? colors.surface : colors.secondary}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={[Theme.typography.h4, { color: colors.secondary }]}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    modalCard: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      alignItems: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    modalHandle: {
      width: 48,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.secondary,
      marginBottom: 12,
    },
    periodSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background || '#FFFFFF',
      borderRadius: 12,
      padding: 12,
      width: '100%',
      marginBottom: 8,
    },
    notifRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background || '#FFFFFF',
      borderRadius: 12,
      padding: 12,
      width: '100%',
      marginBottom: 8,
    },
    closeBtn: {
      position: 'absolute',
      top: 24,
      right: 24,
    },
  });
}

export default PrayerSettingsScreen;