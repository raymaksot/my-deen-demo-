import Theme, { useThemeConfig } from '../../theme/theme';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';

type QiblaStackParamList = {
  FindQibla: undefined;
};

interface Props {
  navigation: StackNavigationProp<QiblaStackParamList, 'FindQibla'>;
}

const FindQiblaScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const coordinates = '21°53′N 102°18′W';
  // TODO: заменить на реальные данные
  const { palette } = useThemeConfig();
  const styles = getStyles(palette);
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={[Theme.typography.h4, { color: palette.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[Theme.typography.h5, { color: palette.text }]}>Find Qibla</Text>
        <TouchableOpacity style={styles.iconBtn}>
          {/* TODO: заменить на Theme.elements.Icon */}
          <Text style={[Theme.typography.h4, { color: palette.text }]}>📍</Text>
        </TouchableOpacity>
      </View>
      {/* Main Image + Path + Coordinates */}
      <View style={styles.imageSection}>
        <Image source={require('../../assets/find_qibla.png')} style={styles.mainImage} />
        <View style={styles.pathOverlay}>
          <View style={styles.pathLine} />
          <View style={styles.coordBox}>
            <Text style={[Theme.typography.label, { color: palette.surface }]}>{coordinates}</Text>
          </View>
        </View>
      </View>
      {/* Compass */}
      <View style={styles.compassSection}>
        <Image source={require('../../assets/find_qibla.png')} style={styles.compassImage} />
      </View>
      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              {/* TODO: заменить на Theme.elements.Icon */}
              <Image source={require('../../assets/find_qibla.png')} style={styles.modalIcon} />
            </View>
            <Text style={[Theme.typography.h5, { textAlign: 'center', marginTop: 12 }]}>Qibla Position Founded!</Text>
            <Text style={[Theme.typography.paragraph, { textAlign: 'center', marginTop: 8, color: palette.secondary }]}>Yey! You have successfully found the Qibla position, now you can perform the prayer</Text>
            <Theme.elements.Button title="Close" variant="primary" style={styles.closeBtn} onPress={() => setModalVisible(false)} loading={false} disabled={false} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

function getStyles(palette: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background || '#FFFFFF',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 12,
      backgroundColor: palette.surface,
    },
    iconBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageSection: {
      position: 'relative',
      width: '100%',
      height: 220,
      backgroundColor: palette.surface,
    },
    mainImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    pathOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pathLine: {
      width: 2,
      height: 120,
      backgroundColor: palette.primary,
      marginTop: 40,
      marginBottom: 8,
    },
    coordBox: {
      backgroundColor: palette.text,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 6,
      marginTop: 8,
    },
    compassSection: {
      alignItems: 'center',
      marginTop: 24,
    },
    compassImage: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCard: {
      backgroundColor: palette.surface,
      borderRadius: 24,
      padding: 24,
      alignItems: 'center',
      width: 320,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    modalIconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: palette.background || '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalIcon: {
      width: 48,
      height: 48,
      resizeMode: 'contain',
    },
    closeBtn: {
      marginTop: 24,
      width: '100%',
      borderRadius: 16,
      height: 48,
    },
  });
}

export default FindQiblaScreen;