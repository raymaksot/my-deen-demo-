import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@/store/hooks';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import WelcomeScreen from '@/screens/auth/WelcomeScreen';
import SplashScreen from '@/screens/SplashScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import FindQiblaScreen from '@/screens/qibla/FindQiblaScreen';
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const MainTabs = () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="FindQibla" component={FindQiblaScreen} />
    </Tabs.Navigator>
);

const RootNavigator = () => {
    const token = useAppSelector((s) => s.auth.token);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? (
                <>
                    {/* Show welcome/onboarding screen first */}
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Main" component={MainTabs} />
                    <Stack.Screen name="QiblaScreen" component={FindQiblaScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;