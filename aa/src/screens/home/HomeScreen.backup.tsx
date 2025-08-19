import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as Location from 'expo-location';
import { prayerService, PrayerTimesResponse } from '@/services/prayerService';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import { schedulePrayerNotifications, scheduleDailyContentNotification } from '@/services/athan';
import { useThemeColors } from '@/theme/theme';
import DailyContent from '@/components/DailyContent';
import { Theme } from '@/theme/theme';

export default function HomeScreen() {
	const navigation = useNavigation<any>();
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
	const [times, setTimes] = useState<PrayerTimesResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const calcMethod = useAppSelector((s) => s.preferences.prayer.calculationMethod);
	const [syncing, setSyncing] = useState(false);

  // Получаем цвета из темы. Стили строим на их основе.
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setError('Location permission denied');
				return;
			}
			const loc = await Location.getCurrentPositionAsync({});
			const lat = loc.coords.latitude;
			const lng = loc.coords.longitude;
			setCoords({ lat, lng });
			try {
				const res = await prayerService.getTodayTimes(lat, lng, calcMethod);
				setTimes(res);
				await schedulePrayerNotifications(res);
				await scheduleDailyContentNotification();
			} catch (e: any) {
				setError(e.message);
			}
		})();
	}, [calcMethod]);

    // Sample content for featured cult and latest articles. In a real app these would come from API
    const videos = [
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
    ];
    const articles = [
        {
            id: 'a1',
            category: 'Historical',
            title: 'The World’s Muslims: Religion, Politics and Society',
            author: 'Natalia Parsha',
            image: require('../../../assets/onboarding.png'),
        },
        {
            id: 'a2',
            category: 'Historical',
            title: 'Biography of Abdullah bin Umar radhiyallahu "anhu',
            author: 'Muhammad Faqih',
            image: require('../../../assets/onboarding.png'),
        },
        {
            id: 'a3',
            category: 'Fiqh',
            title: 'Fasting, but Remaining Disobedient',
            author: 'Muhammad Idris',
            image: require('../../../assets/onboarding.png'),
        },
    ];

    const mosquesList = [
        { id: 'm1', name: 'Baitul Mustaqin Mosque', distance: '736 M', image: require('../../../assets/onboarding.png') },
        { id: 'm2', name: 'Darius Mosque', distance: '1,2 Km', image: require('../../../assets/onboarding.png') },
    ];

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header с фоном и приветствием */}
        <ImageBackground source={require('../../../assets/homepage.png')} style={styles.headerBg}>
          <View style={styles.headerOverlay}>
            <Text style={[Theme.typography.label, { color: colors.background }]}>Assalamu'alaikum</Text>
            <Text style={[Theme.typography.h4, { color: colors.background, marginBottom: 8 }]}>Fatimah Jaber</Text>
            {/* Иконка уведомлений и аватар */}
            <View style={styles.headerIcons}>
              {/* TODO: добавить иконку уведомлений и аватар через Theme.elements.Icon */}
            </View>
          </View>
        </ImageBackground>
        {/* Блок времени молитвы и кнопка Find Qibla */}
        <View style={styles.prayerCard}>
          <Text style={[Theme.typography.label, { color: colors.background }]}>Next prayer is Dhuhr</Text>
          <Text style={[Theme.typography.h2, { color: colors.background }]}>12:23 PM</Text>
          <Theme.elements.Button
            title="Find Qibla"
            variant="background"
            style={{ marginTop: 8 }}
            onPress={() => navigation.navigate('QiblaScreen')}
            loading={false}
            disabled={false}
          />
        </View>
        {/* Featured Cult */}
        <View style={styles.sectionRow}>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>Featured Cult</Text>
          <TouchableOpacity><Text style={[Theme.typography.label, { color: colors.primary }]}>See All</Text></TouchableOpacity>
        </View>
        {/* Табы категорий */}
        <View style={styles.tabsRow}>
          {['Quran', 'Hadith', 'History', 'Creed', 'Manhaj', 'Fiqh'].map((cat) => (
            <TouchableOpacity key={cat} style={[styles.tab, cat === 'Quran' && styles.tabActive]}>
              <Text style={[Theme.typography.label, cat === 'Quran' ? { color: colors.primary } : { color: colors.secondary }]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Список видео */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
          {videos.map((video) => (
            <View key={video.id} style={styles.videoCard}>
              <Image source={video.thumbnail} style={styles.videoImage} />
              <Text style={[Theme.typography.label, { position: 'absolute', top: 8, left: 8, backgroundColor: colors.background, borderRadius: 4, paddingHorizontal: 4 }]}>{video.duration}</Text>
              <Text style={[Theme.typography.h6, { marginTop: 8 }]}>{video.title}</Text>
              <Text style={[Theme.typography.label, { color: colors.secondary }]}>{video.author}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Latest Article */}
        <View style={styles.sectionRow}>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>Latest Article</Text>
          <TouchableOpacity><Text style={[Theme.typography.label, { color: colors.primary }]}>See All</Text></TouchableOpacity>
        </View>
        {/* Список статей */}
        {articles.map((article) => (
          <View key={article.id} style={styles.articleCard}>
            <Image source={article.image} style={styles.articleImage} />
            <Text style={[Theme.typography.label, { color: colors.primary }]}>{article.category}</Text>
            <Text style={[Theme.typography.h6, { marginTop: 4 }]}>{article.title}</Text>
            <Text style={[Theme.typography.label, { color: colors.secondary }]}>{article.author}</Text>
          </View>
        ))}
      </ScrollView>
    );
}

// Factory to create dynamic styles for the home screen. Colours are
// derived from the active theme.  Various UI elements such as the
// hero overlay, prayer card and button backgrounds change when
// switching between light and dark modes.
const createStyles = (colors: { [key: string]: string }) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background || '#FFFFFF' },
    headerBg: {
      height: 260,
      justifyContent: 'flex-end',
    },
    headerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: (colors.background || '#FFFFFF') === '#0B1220' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
      padding: 16,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    prayerCard: {
      backgroundColor:
        (colors.background || '#FFFFFF') === '#0B1220' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      padding: 16,
      alignItems: 'flex-start',
    },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 24 },
    tabsRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 8, marginBottom: 16 },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 16,
      marginRight: 8,
      backgroundColor: colors.background === '#0B1220' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    videoCard: {
      width: 200,
      marginRight: 16,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.background === '#0B1220' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
    },
    videoImage: {
      width: '100%',
      height: 120,
      borderRadius: 16,
      resizeMode: 'cover',
    },
    articleCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      marginTop: 16,
      backgroundColor: colors.background === '#0B1220' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
    },
    articleImage: {
      width: 72,
      height: 72,
      borderRadius: 12,
      resizeMode: 'cover',
    },
  });