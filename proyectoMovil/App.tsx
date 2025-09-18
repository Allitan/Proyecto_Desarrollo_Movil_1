import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import ProviderEvento from './Providers/ProviderEvento';
import { NotificacionProvider } from './Providers/ProviderNotificacion';
import ButtonTabNavegacion from './Componentes/ButtonTabNavegacion';
import LoginScreen from './Pages/Auth/LoginScreen';
import RegisterScreen from './Pages/Auth/RegisterScreen';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';

export type AuthStackParamList = {
    Login:undefined;
    Register:undefined;
}

export type MainStackParamList ={
    Main: undefined;
};

Notifications.setNotificationHandler({
    handleNotification: async () =>({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    } as Notifications.NotificationBehavior),
});

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const MainStack = createNativeStackNavigator<MainStackParamList>()

function AuthScreens() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

function MainScreens() {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Main" component={ButtonTabNavegacion} />
        </MainStack.Navigator>
    );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();
  
    return isLoggedIn ? <MainScreens /> : <AuthScreens />;
}

export default function App() {
    return (
        <AuthProvider>
            <NotificacionProvider>
                <ProviderEvento>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </ProviderEvento>
            </NotificacionProvider>
        </AuthProvider>
    );
}