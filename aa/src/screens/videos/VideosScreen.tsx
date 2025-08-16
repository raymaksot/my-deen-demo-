import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../theme/theme';

interface Video {
  id: string;
  title: string;
  category: string;
  author: string;
  thumbnail: any;
  duration: string;
}

const videos: Video[] = [
  {
    id: 'v1',
    title: 'Summary of During Ramadan Fasting Fiqh',
    category: 'Quran',
    author: 'Sarina Ahmad',
    thumbnail: require('../../../assets/onboarding.png'),
    duration: '15:21',
  },
  {
    id: 'v2',
    title: 'Q&A with Shaykh Abbad',
    category: 'Hadith',
    author: 'Muhammad Abbad',
    thumbnail: require('../../../assets/onboarding.png'),
    duration: '15:21',
  },
  {
    id: 'v3',
    title: 'The Beauty of Islamic Art and Architecture',
    category: 'History',
    author: 'Sarina Ahmad',
    thumbnail: require('../../../assets/onboarding.png'),
    duration: '15:21',
  },
  {
    id: 'v4',
    title: 'Islamic Parenting: Nurturing the Next Generation',
    category: 'Fiqh',
    author: 'Unknown',
    thumbnail: require('../../../assets/onboarding.png'),
    duration: '15:21',
  },
];

const categories = ['Quran', 'Hadith', 'History', 'Creed', 'Manhaj', 'Fiqh'];

export default function VideosScreen() {
  const navigation = useNavigation<any>();
  const [selectedCat, setSelectedCat] = useState('Quran');
  const featured = videos.filter((v) => v.category === selectedCat);
  const recent = videos;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>←</Text>
        </TouchableOpacity>
  <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>Cult Videos</Text>
        {/* TODO: добавить иконку настроек через Theme.elements.Icon */}
      </View>
      {/* Поисковое поле */}
      <View style={styles.searchBox}>
  <Text style={[Theme.typography.label, { color: Theme.palette.secondary }]}>Search surah or Verse</Text>
      </View>
      {/* Featured Cult */}
      <View style={styles.sectionRow}>
  <Text style={[Theme.typography.h5, { color: Theme.palette.text }]}>Featured Cult</Text>
  <TouchableOpacity><Text style={[Theme.typography.label, { color: Theme.palette.primary }]}>See All</Text></TouchableOpacity>
      </View>
      {/* Табы категорий */}
      <View style={styles.tabsRow}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} style={[styles.tab, cat === selectedCat && styles.tabActive]} onPress={() => setSelectedCat(cat)}>
            <Text style={[Theme.typography.label, cat === selectedCat ? { color: Theme.palette.primary } : { color: Theme.palette.secondary }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Список видео */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
        {featured.map((video) => (
          <View key={video.id} style={styles.videoCard}>
            <Image source={video.thumbnail} style={styles.videoImage} />
            <Text style={[Theme.typography.label, { position: 'absolute', top: 8, left: 8, backgroundColor: Theme.palette.background, borderRadius: 4, paddingHorizontal: 4 }]}>{video.duration}</Text>
            <Text style={[Theme.typography.h6, { marginTop: 8 }]}>{video.title}</Text>
            <Text style={[Theme.typography.label, { color: Theme.palette.secondary }]}>{video.author}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Recently Viewed */}
      <Text style={[Theme.typography.h5, { marginTop: 24 }]}>Recently Viewed</Text>
      {recent.map((video) => (
        <View key={video.id} style={styles.videoCard}>
          <Image source={video.thumbnail} style={styles.videoImage} />
          <Text style={[Theme.typography.label, { position: 'absolute', top: 8, left: 8, backgroundColor: Theme.palette.background, borderRadius: 4, paddingHorizontal: 4 }]}>{video.duration}</Text>
          <Text style={[Theme.typography.h6, { marginTop: 8 }]}>{video.title}</Text>
          <Text style={[Theme.typography.label, { color: Theme.palette.secondary }]}>{video.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background || '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  backgroundColor: Theme.palette.surface,
  },
  backBtn: {
    marginRight: 12,
  },
  searchBox: {
    margin: 16,
    padding: 12,
  backgroundColor: Theme.palette.surface,
    borderRadius: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  backgroundColor: Theme.palette.surface,
    marginRight: 8,
  },
  tabActive: {
  backgroundColor: Theme.palette.primary,
  },
  videoCard: {
    width: 160,
    marginRight: 12,
  backgroundColor: Theme.palette.surface,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    padding: 8,
  },
  videoImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});