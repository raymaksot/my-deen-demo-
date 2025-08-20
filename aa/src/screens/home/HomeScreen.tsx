import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

      {/* Daily Content Component */}
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <DailyContent />
      </View>
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
  });