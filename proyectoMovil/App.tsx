import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import ProviderEvento from './Providers/ProviderEvento';
import ButtonTabNavegacion from './Componentes/ButtonTabNavegacion';
import LoginScreen from './Pages/Auth/LoginScreen';
import RegisterScreen from './Pages/Auth/RegisterScreen';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

export type MainStackParamList = {
    Main: undefined;
};

Notifications.setNotificationHandler({
    handleNotification:async() =>({
        shouldShowAlert:true,
        shouldPlaySound:true,
        shouldSetBadge:true,
    } as Notifications.NotificationBehavior),
});

async function registerForPushNotificationsAsync() {
    const {status: existingStatus}=await Notifications.getPermissionsAsync()
    let finalStatus=existingStatus

    if (existingStatus !=='granted') {
        const { status} =await Notifications.requestPermissionsAsync();
        finalStatus =status;
    }

    if (finalStatus!== 'granted') {
        Alert.alert('Permiso denegado', 'No se podrán enviar notificaciones');
    }
}


const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

// 3. Componente que maneja las pantallas de Autenticación
function AuthScreens() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

// 4. Componente que maneja las pantallas Principales
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
    React.useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);
    return (
        <AuthProvider>
            <ProviderEvento>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </ProviderEvento>
        </AuthProvider>
    );
}