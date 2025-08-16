import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { store } from './src/store';
import RootNavigator from '@/navigation/RootNavigator';
import i18n from './src/i18n';
import { useAppSelector } from '@/store/hooks';
import { initAuthFromStorage } from '@/store/authSlice';
import { registerBackgroundTasks } from '@/services/background';
import { configureNotificationChannel, registerDeviceToken } from '@/notifications/registerDeviceToken';
import { ENV } from './src/config/env';
import { NetworkStatusBanner } from '@/components/NetworkStatusBanner'; 
import 'intl-pluralrules';



function AppInner() {
	const [isReady, setIsReady] = useState(false);
	const themeMode = useAppSelector((s) => s.preferences.themeMode);
	const locale = useAppSelector((s) => s.preferences.locale);
	const navTheme = themeMode === 'dark' ? DarkTheme : DefaultTheme;

	useEffect(() => {
		async function init() {
			await store.dispatch(initAuthFromStorage());
			if (Device.isDevice) {
			await registerDeviceToken(ENV.backendBaseUrl || '');
			}
			await registerBackgroundTasks();
			setIsReady(true);
		}
		init();
	}, []);

	useEffect(() => {
		i18n.changeLanguage(locale);
	}, [locale]);

	if (!isReady) {
		// Splash-экран или Loader
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
						{/* Исправлено: импортируем Text из react-native */}
						<StatusBar barStyle="dark-content" />
						<View style={{ alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Загрузка...</Text>
						</View>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer theme={navTheme}>
				<StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
				<NetworkStatusBanner />
				<RootNavigator />
			</NavigationContainer>
		</View>
	);
}

export default function App() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: false,
				shouldShowBanner: true,
				shouldShowList: true,
			}),
		});

	return (
		<Provider store={store}>
			<AppInner />
		</Provider>
	);
}