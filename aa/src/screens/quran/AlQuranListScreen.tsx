import { Theme } from '../../theme/theme';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';

interface Surah {
  id: number;
  name: string;
  subtitle: string;
  arabic: string;
}

type RootStackParamList = {
  SurahDetail: { surah: Surah };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SurahDetail'>;
};

import { apiGet } from '../../services/api';

const AlQuranListScreen: React.FC<Props> = ({ navigation }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  useEffect(() => {
    apiGet('/api/quran/surahs').then((data) => setSurahs(data));
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
  <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>Al - Quran</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Text style={[Theme.typography.h4]}>🔍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={[Theme.typography.h4]}>⚙️</Text></TouchableOpacity>
        </View>
      </View>
      {/* Search */}
      <View style={styles.searchBox}>
  <TextInput placeholder="Search surah or Verse" style={styles.searchInput} placeholderTextColor={Theme.palette.secondary} />
      </View>
      {/* Continue Reading Card */}
      <TouchableOpacity style={styles.continueCard}>
        <View style={styles.continueIcon}><Text style={[Theme.typography.h4]}>📖</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={[Theme.typography.label, { color: Theme.palette.surface }]}>Continue reading</Text>
          <Text style={[Theme.typography.h5, { color: Theme.palette.surface }]}>Al Baqarah : 128</Text>
        </View>
  <Text style={[Theme.typography.h4, { color: Theme.palette.surface }]}>→</Text>
      </TouchableOpacity>
      {/* Quran Lists */}
      <View style={styles.listHeaderRow}>
  <Text style={[Theme.typography.label, { color: Theme.palette.text }]}>Quran Lists</Text>
  <TouchableOpacity><Text style={[Theme.typography.label, { color: Theme.palette.primary }]}>Shuffle</Text></TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {surahs.map((s) => (
          <TouchableOpacity key={s.id} style={styles.surahCard} onPress={() => navigation.navigate('SurahDetail', { surah: s })}>
            <View style={styles.surahCircle}><Text style={[Theme.typography.h5]}>{s.id}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={[Theme.typography.h5, { color: Theme.palette.text }]}>{s.name}</Text>
              <Text style={[Theme.typography.label, { color: Theme.palette.secondary }]}>{s.subtitle}</Text>
            </View>
            <Text style={[Theme.typography.h5, { color: Theme.palette.primary }]}>{s.arabic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background || '#FFFFFF',
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchBox: {
    marginHorizontal: 16,
    marginBottom: 12,
  backgroundColor: Theme.palette.surface,
    borderRadius: 12,
    padding: 8,
  },
  searchInput: {
    fontSize: 16,
  color: Theme.palette.text,
    padding: 8,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
  backgroundColor: Theme.palette.primary,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  continueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  backgroundColor: Theme.palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
  backgroundColor: Theme.palette.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  surahCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  backgroundColor: Theme.palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});

export default AlQuranListScreen;