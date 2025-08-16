import { Theme } from '../../theme/theme';
import { useThemeColors } from '../../theme/theme';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  FindMosque: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FindMosque'>;
};

import { useEffect } from 'react';
import { apiGet } from '../../services/api';

const FindMosqueScreen: React.FC<Props> = ({ navigation }) => {
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const [mosques, setMosques] = useState<any[]>([]);
  const [selectedMosque, setSelectedMosque] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    apiGet('/api/mosques').then((data) => setMosques(data));
  }, []);
  return (
  <View style={styles.container}>
      {/* Top Bar */}
  <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
  <Text style={[Theme.typography.h5, { color: colors.text }]}>Find Mosque</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={[Theme.typography.h4, { color: colors.text }]}>🔍</Text>
        </TouchableOpacity>
      </View>
      {/* Map */}
  <View style={styles.mapSection}>
        <Image source={require('../../assets/find_mosque.png')} style={styles.mapImage} />
      </View>
      {/* Nearest Mosque */}
  <Text style={[Theme.typography.label, { color: colors.text, marginHorizontal: 16, marginTop: 24 }]}>Nearest Mosque</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12, paddingHorizontal: 16 }}>
        {mosques.map((m) => (
          <TouchableOpacity key={m.id} style={styles.mosqueCard} onPress={() => { setSelectedMosque(m); setModalVisible(true); }}>
            <Image source={m.image} style={styles.mosqueImage} />
            <View style={styles.openBadge}><Text style={[Theme.typography.label, { color: colors.surface }]}>{m.open ? 'Open' : 'Closed'}</Text></View>
            <Text style={[Theme.typography.h6, { marginTop: 8 }]}>{m.name}</Text>
            <Text style={[Theme.typography.label, { color: colors.secondary }]}>{m.distance}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Modal Mosque Detail */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            {selectedMosque && (
              <>
                <Image source={selectedMosque.image} style={styles.modalMosqueImage} />
                <View style={styles.openBadgeModal}><Text style={[Theme.typography.label, { color: colors.surface }]}>{selectedMosque.open ? 'Open' : 'Closed'}</Text></View>
                <Text style={[Theme.typography.h6, { marginTop: 12 }]}>{selectedMosque.name}</Text>
                <Text style={[Theme.typography.label, { color: colors.secondary }]}>{selectedMosque.distance}</Text>
                <Theme.elements.Button
                  title="Navigate Now"
                  variant="primary"
                  style={styles.navigateBtn}
                  onPress={() => setModalVisible(false)}
                  loading={false}
                  disabled={false}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background || '#FFFFFF',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 12,
      backgroundColor: colors.surface,
    },
    iconBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapSection: {
      width: '100%',
      height: 220,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 0,
    },
    mosqueCard: {
      width: 220,
      marginRight: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      overflow: 'hidden',
      padding: 12,
      position: 'relative',
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    mosqueImage: {
      width: '100%',
      height: 120,
      borderRadius: 12,
      resizeMode: 'cover',
    },
    openBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
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
    modalMosqueImage: {
      width: 320,
      height: 160,
      borderRadius: 16,
      resizeMode: 'cover',
      marginBottom: 8,
    },
    openBadgeModal: {
      position: 'absolute',
      top: 32,
      left: 32,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    navigateBtn: {
      marginTop: 24,
      width: '100%',
      borderRadius: 16,
      height: 48,
    },
  });
}

export default FindMosqueScreen;