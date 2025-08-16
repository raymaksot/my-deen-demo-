import Theme from '../../theme/theme';
import { Alert } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/authSlice';
import { authService } from '@/services/authService';

const genderOptions: { label: string; value: 'male' | 'female' | 'other' }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

/**
 * EditProfileScreen allows the user to update their name, gender and location.
 * The email is shown read‑only.  A simple modal is used to select gender.
 */
function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('other');
  const [location, setLocation] = useState('');
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(require('../../../assets/signin_dark.png'));

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setGender((user.gender as any) || 'other');
      setLocation(user.location || '');
    }
  }, [user]);

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await authService.updateProfile({ name, gender, location });
      dispatch(setUser(updated));
      navigation.goBack();
    } catch (e) {
      console.error('Failed to update profile', e);
      // Показываем пользователю ошибку
  Alert.alert('Ошибка', 'Не удалось сохранить профиль. Попробуйте позже.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[Theme.typography.h4, { color: Theme.palette.surface }]}>←</Text>
        </TouchableOpacity>
  <Text style={[Theme.typography.h4, { color: Theme.palette.surface }]}>Edit Profile</Text>
      </View>
      <View style={styles.avatarBox}>
        <Image source={avatar} style={styles.avatar} />
  <TouchableOpacity style={styles.avatarEdit}><Text style={[Theme.typography.h5, { color: Theme.palette.primary }]}>✎</Text></TouchableOpacity>
      </View>
      <View style={styles.form}>
  <Text style={[Theme.typography.h5, { color: Theme.palette.text }]}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          placeholderTextColor={Theme.palette.secondary}
        />
  <Text style={[Theme.typography.h5, { color: Theme.palette.text, marginTop: 16 }]}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          placeholderTextColor={Theme.palette.secondary}
        />
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: saving ? '#9CA3AF' : '#0E7490' }]}
          onPress={handleSave}
          disabled={saving || !name}
        >
          <Text style={[Theme.typography.h5, { color: Theme.palette.surface }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      {/* Gender picker modal */}
      <Modal
        visible={showGenderPicker}
        animationType="slide"
        transparent
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <View style={styles.modalHandle} />
            </View>
            {genderOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.optionRow}
                onPress={() => {
                  setGender(opt.value);
                  setShowGenderPicker(false);
                }}
              >
                <Text style={{ fontSize: 16, color: '#111827' }}>{opt.label}</Text>
                {gender === opt.value && <Text style={{ fontSize: 16 }}>✔</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background || '#FFFFFF',
    padding: 0,
  },
  header: {
    height: 80,
  backgroundColor: Theme.palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 16,
  },
  avatarBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  avatarEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  backgroundColor: Theme.palette.surface,
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  form: {
    paddingHorizontal: 24,
  },
  input: {
  ...Theme.typography.paragraph,
  backgroundColor: Theme.palette.surface,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  color: Theme.palette.text,
    borderWidth: 1,
  borderColor: Theme.palette.secondary,
  },
  saveBtn: {
  backgroundColor: Theme.palette.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    elevation: 2,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export default EditProfileScreen;