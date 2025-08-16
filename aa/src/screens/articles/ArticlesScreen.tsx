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
import Theme, { useThemeConfig } from '@/theme/theme';

// Simple representation of an article used for the list.  In a real
// application you would fetch this from your API.
interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  image: any; // require()
  excerpt: string;
  content: string;
}

const sampleArticles: Article[] = [
  {
    id: '1',
    category: 'Historical',
    title: 'The Beauty of Islamic Art and Architecture',
    author: 'Sarina Ahmad',
    image: require('../../../assets/onboarding.png'),
    excerpt:
      'Islamic art and architecture are among the most impressive and visually striking artistic traditions in the world.',
    content:
      'Islamic art and architecture are among the most impressive and visually striking artistic traditions in the world. Spanning centuries and encompassing diverse regions and cultures, Islamic art has left an indelible mark on the world of art and architecture. In this article, we will explore the rich history and cultural significance of Islamic art and architecture, and discover the beauty of this magnificent tradition...'
  },
  {
    id: '2',
    category: 'Historical',
    title: "The World's Muslims: Religion, Politics and Society",
    author: 'Natalia Parsha',
    image: require('../../../assets/onboarding.png'),
    excerpt: 'A comprehensive look at the lives of Muslims around the globe and how faith shapes their societies.',
    content: 'Full content coming soon...'
  },
  {
    id: '3',
    category: 'Historical',
    title: 'Biography of Abdullah bin Umar radhiyallahu \"anhu',
    author: 'Muhammad Faqih',
    image: require('../../../assets/onboarding.png'),
    excerpt: 'Explore the life and times of one of the companions of the Prophet and his contributions to Islamic scholarship.',
    content: 'Full content coming soon...'
  },
  {
    id: '4',
    category: 'Fiqh',
    title: 'Fasting, but Remaining Disobedient',
    author: 'Muhammad Idris',
    image: require('../../../assets/onboarding.png'),
    excerpt: 'An examination of the spiritual dimensions of fasting and why abstaining from food alone is not enough.',
    content: 'Full content coming soon...'
  },
];

const categories = ['Quran', 'Hadith', 'History', 'Creed', 'Manhaj', 'Fiqh'];

export default function ArticlesScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('Quran');
  const { palette, fontMultiplier } = useThemeConfig();
  const styles = React.useMemo(() => createStyles(palette, fontMultiplier), [palette, fontMultiplier]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: palette.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[Theme.typography.h4, { color: palette.text }]}>Article</Text>
        {/* TODO: добавить иконку настроек через Theme.elements.Icon */}
      </View>
      {/* Поисковое поле */}
      <View style={styles.searchBox}>
        <Text style={[Theme.typography.label, { color: palette.secondary }]}>Search article title</Text>
      </View>
      {/* Continue Reading */}
      <Text style={[Theme.typography.h5, { marginTop: 24 }]}>Continue Reading</Text>
      <View style={styles.continueCard}>
        <Image source={sampleArticles[0].image} style={styles.continueImage} />
        <Text style={[Theme.typography.label, { color: palette.primary }]}>{sampleArticles[0].category}</Text>
        <Text style={[Theme.typography.h6, { marginTop: 4 }]}>{sampleArticles[0].title}</Text>
        <Text style={[Theme.typography.label, { color: palette.secondary }]}>{sampleArticles[0].author}</Text>
      </View>
      {/* Featured Article */}
      <Text style={[Theme.typography.h5, { marginTop: 24 }]}>Featured Article</Text>
      {/* Табы категорий */}
      <View style={styles.tabsRow}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} style={[styles.tab, cat === selectedCategory && styles.tabActive]} onPress={() => setSelectedCategory(cat)}>
            <Text style={[Theme.typography.label, cat === selectedCategory ? { color: palette.primary } : { color: palette.secondary }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Список статей */}
      {sampleArticles.filter(a => a.category === selectedCategory).map((article) => (
        <View key={article.id} style={styles.articleCard}>
          <Image source={article.image} style={styles.articleImage} />
          <Text style={[Theme.typography.label, { color: palette.primary }]}>{article.category}</Text>
          <Text style={[Theme.typography.h6, { marginTop: 4 }]}>{article.title}</Text>
          <Text style={[Theme.typography.label, { color: palette.secondary }]}>{article.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const createStyles = (palette: { [key: string]: string }, fontMultiplier: number) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background || '#FFFFFF' },
    headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 },
    backBtn: { padding: 4, marginRight: 8 },
    headerTitle: { fontSize: 20 * fontMultiplier, fontWeight: '600', color: palette.text },
    searchBox: {
      marginTop: 16,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 12,
      padding: 12,
      backgroundColor: palette.card,
    },
    sectionTitle: { fontSize: 18 * fontMultiplier, fontWeight: '700', marginBottom: 8, color: palette.text },
    continueCard: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: palette.card,
    },
    continueImage: { width: '100%', height: 180, borderTopLeftRadius: 16, borderTopRightRadius: 16, resizeMode: 'cover' },
    continueTitle: { fontSize: 16 * fontMultiplier, fontWeight: '700', marginTop: 4, color: palette.text },
    continueAuthor: { fontSize: 12 * fontMultiplier, color: palette.muted, marginTop: 2 },
    categoryLabel: { fontSize: 12 * fontMultiplier, color: palette.muted, marginBottom: 2 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    seeAll: { color: palette.primary, fontSize: 14 * fontMultiplier, fontWeight: '600' },
    tabsRow: { flexDirection: 'row', marginTop: 12, marginHorizontal: 16 },
    tab: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: palette.card,
      marginRight: 8,
    },
    tabActive: { backgroundColor: palette.primary + '20' }, // 20% opacity
    tabText: { fontSize: 14 * fontMultiplier, color: palette.muted },
    tabTextSelected: { color: palette.primary, fontWeight: '600' },
    articleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    articleCard: {
      backgroundColor: palette.card,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 16,
      marginTop: 12,
      shadowColor: palette.text,
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    articleImage: { width: 72, height: 72, borderRadius: 12, resizeMode: 'cover' },
    articleTitle: { fontSize: 16 * fontMultiplier, fontWeight: '600', color: palette.text },
    articleAuthor: { fontSize: 12 * fontMultiplier, color: palette.muted, marginTop: 2 },
  });