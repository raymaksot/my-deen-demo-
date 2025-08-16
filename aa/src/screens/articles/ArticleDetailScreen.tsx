import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CommentsThread } from '@/components/CommentsThread';
import { Theme } from '../../theme/theme';

export default function ArticleDetailScreen() {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const article = route.params?.article;
  // Fallback if opened without params
  const {
    title = 'Article Title',
    category = 'Category',
    author = 'Author',
    image,
    content = 'Content coming soon…',
  } = article || {};

  // Hard-coded related articles; in a real app this would come from API
  const related = [
    {
      id: 'rel1',
      title: 'The World’s Muslims: Religion, Politics and Society',
      author: 'Natalia Parsha',
      category: 'Historical',
      image: require('../../../assets/onboarding.png'),
    },
    {
      id: 'rel2',
      title: 'Biography of Abdullah bin Umar radhiyallahu "anhu',
      author: 'Muhammad Faqih',
      category: 'Historical',
      image: require('../../../assets/onboarding.png'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: Theme.palette.text }]}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[Theme.typography.label, { color: Theme.palette.primary }]}>{category}</Text>
          <Text style={[Theme.typography.h5, { color: Theme.palette.text }]}>{title}</Text>
        </View>
        {/* TODO: добавить иконку сохранения через Theme.elements.Icon */}
      </View>
      {image && <Image source={image} style={styles.coverImage} />}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.authorRow}>
          <Image
            source={{ uri: 'https://placekitten.com/100/100' }}
            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }}
          />
          <Text style={[Theme.typography.label, { color: Theme.palette.text }]}>{author}</Text>
        </View>
        {/* Article body */}
        <Text style={[Theme.typography.paragraph, { color: Theme.palette.text }]}>{content}</Text>
        {/* Related Articles */}
        <Text style={[Theme.typography.h6, { marginTop: 24 }]}>Related Article</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          {related.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedCard}
              onPress={() => navigation.push('ArticleDetail', { article: item })}
            >
              <Image source={item.image} style={styles.relatedImage} />
              <View style={{ padding: 8 }}>
                <Text style={[Theme.typography.label, { color: Theme.palette.primary }]}>{item.category}</Text>
                <Text style={[Theme.typography.h6]} numberOfLines={2}>{item.title}</Text>
                <Text style={[Theme.typography.label, { color: Theme.palette.secondary }]}>By {item.author}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Comments section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Comments</Text>
        <CommentsThread
          parentType="article"
          parentId={article?.id || 'unknown'}
          canEdit={(comment) => true}
        />
      </View>
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
  coverImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  relatedCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: Theme.palette.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  relatedImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  sectionTitle: {
    ...Theme.typography.h6,
    color: Theme.palette.primary,
    marginTop: 24,
  },
});