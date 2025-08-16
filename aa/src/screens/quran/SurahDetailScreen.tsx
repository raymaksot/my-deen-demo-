import { Theme } from '../../theme/theme';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';

interface Ayah {
  id: number;
  arabic: string;
  translation: string;
  audio?: boolean;
}

type Surah = {
  id: number;
  name: string;
};

type RootStackParamList = {
  SurahDetail: { surah: Surah };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SurahDetail'>;
  route: { params: { surah: Surah } };
};

const ayahs: Ayah[] = [
  { id: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the Name of Allah—the Most Compassionate, Most Merciful.' },
  { id: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'All praise is for Allah—Lord of all worlds', audio: true },
  { id: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Most Compassionate, Most Merciful,' },
  { id: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Master of the Day of Judgment.' },
  { id: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: "You 'alone' we worship and You 'alone' we ask for help." },
  { id: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us along the Straight Path,' },
  { id: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'the Path of those You have blessed—not those You are displeased with, or those who are astray.' },
];

const SurahDetailScreen: React.FC<any> = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { surah } = route.params;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>←</Text>
        </TouchableOpacity>
  <Text style={[Theme.typography.h5, { color: Theme.palette.text }]}>{surah.name}</Text>
        <TouchableOpacity style={styles.iconBtn}>
            <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>⚙️</Text>
        </TouchableOpacity>
      </View>
      {/* Ayah List */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {ayahs.map((a) => (
          <View key={a.id} style={styles.ayahCard}>
            <View style={styles.ayahCircle}><Text style={[Theme.typography.h5]}>{a.id}</Text></View>
            <View style={{ flex: 1 }}>
                <Text style={[Theme.typography.h5, { color: Theme.palette.text, textAlign: 'right' }]}>{a.arabic}</Text>
              <Text style={[Theme.typography.paragraph, { color: Theme.palette.secondary }]}>{a.translation}</Text>
            </View>
            {/* Icons row */}
            <View style={styles.iconsRow}>
              <TouchableOpacity><Text style={[Theme.typography.h5]}>▶️</Text></TouchableOpacity>
              <TouchableOpacity><Text style={[Theme.typography.h5]}>📖</Text></TouchableOpacity>
              <TouchableOpacity><Text style={[Theme.typography.h5]}>🔗</Text></TouchableOpacity>
            </View>
            {/* Audio player for ayah 2 */}
            {a.audio && (
              <View style={styles.audioRow}>
                <Text style={[Theme.typography.paragraph, { color: Theme.palette.surface }]}>00:04 / 00:12</Text>
                <TouchableOpacity><Text style={[Theme.typography.h5]}>⏸️</Text></TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      {/* Modal Description */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={[Theme.typography.h5, { marginBottom: 4 }]}>{surah.name}</Text>
            <Text style={[Theme.typography.paragraph, { color: Theme.palette.secondary }]}>Verses 2</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              <Text style={[Theme.typography.paragraph, { color: Theme.palette.text }]}>The Quran has a special and characteristic way of expressing a believer’s inner sentiments in the most appropriate words. The invocation of God in the opening chapter of the Quran, constitute a supplication of this nature. The feelings which are naturally aroused in one after discovering the truth are expressed in these lines. When man looks at the world around him, he cannot fail to notice God’s power and mercy abundantly in evidence everywhere. Wherever he casts his glance, he finds extraordinary order and supervision.\n\nEverything has been extraordinarily and astonishingly adapted to man’s needs. This observation shows that the great cosmic machine cannot be in vain. Therefore, one realizes that there must come a day when the grateful and the ungrateful are rewarded for the way they have lived their lives in this world. One spontaneously entreats God in words to this effect, ‘Lord, You are the Master of the Day of Judgement. I have submitted to You and humbly seek Your help; have mercy on me. Lord, show us the path that is, to You, the true path, the path of Your chosen servants, those who have gone astray, and the path of those who have incurred Your wrath due to their actions.’ (Сокращено для примера)</Text>
            </ScrollView>
            <Theme.elements.Button title="Scroll Down for More" variant="primary" style={styles.scrollBtn} onPress={() => {}} loading={false} disabled={false} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={[Theme.typography.h4, { color: Theme.palette.secondary }]}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SurahDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background || '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: Theme.palette.surface,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahCard: {
    backgroundColor: Theme.palette.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  ayahCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Theme.palette.surface,
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
    backgroundColor: Theme.palette.secondary,
    marginBottom: 12,
  },
  scrollBtn: {
    marginTop: 24,
    width: '100%',
    borderRadius: 16,
    height: 48,
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
});