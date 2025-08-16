import { Theme } from '../../theme/theme';
import { useThemeColors } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';

const prayers = [
  { id: 1, name: 'Fajr', time: '3:33 Am', icon: '🌅' },
  { id: 2, name: 'Dhuhr', time: '11:53 Am', icon: '☀️' },
  { id: 3, name: 'Asr', time: '3:06 Pm', icon: '☁️' },
  { id: 4, name: 'Maghrib', time: '5:54 Pm', icon: '🌅' },
  { id: 5, name: 'Isa', time: '7:9 Pm', icon: '🌙' },
];

const PrayerTimeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(8);
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[Theme.typography.h4, { color: colors.text }]}>Prayer Time</Text>
        <TouchableOpacity style={styles.iconBtn}><Text style={[Theme.typography.h4]}>⚙️</Text></TouchableOpacity>
      </View>
      {/* Calendar */}
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <Text style={[Theme.typography.label, { color: colors.text }]}>March, 2023</Text>
          <TouchableOpacity><Text style={[Theme.typography.h5, { color: colors.primary }]}>▼</Text></TouchableOpacity>
        </View>
        <View style={styles.calendarRow}>
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <Text key={d} style={[Theme.typography.label, { color: colors.secondary, flex: 1, textAlign: 'center' }]}>{d}</Text>
          ))}
        </View>
        <View style={styles.datesRow}>
          {[28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((date) => (
            <TouchableOpacity key={date} style={[styles.dateCircle, selectedDate === date && styles.dateActive]} onPress={() => setSelectedDate(date)}>
              <Text style={[Theme.typography.label, selectedDate === date ? { color: colors.surface } : { color: colors.text }]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Daily Shalat Lists */}
      <Text style={[Theme.typography.label, { color: colors.text, marginHorizontal: 16, marginTop: 24 }]}>Daily Shalat Lists</Text>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {prayers.map((p) => (
          <View key={p.id} style={styles.prayerCard}>
            <Text style={[Theme.typography.h5, { marginRight: 12 }]}>{p.icon}</Text>
            <Text style={[Theme.typography.h5, { flex: 1, color: colors.text }]}>{p.name}</Text>
            <Text style={[Theme.typography.label, { color: colors.secondary }]}>{p.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
// ...existing code...
};

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background || '#FFFFFF',
      paddingTop: 24,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    iconBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendarCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginHorizontal: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    calendarHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    calendarRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    datesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },
    dateCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 4,
      marginBottom: 4,
    },
    dateActive: {
      backgroundColor: colors.primary,
    },
    prayerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
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

export default PrayerTimeScreen;