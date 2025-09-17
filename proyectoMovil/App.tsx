import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import ProviderEvento from './Providers/ProviderEvento';
import ButtonTabNavegacion from './Componentes/ButtonTabNavegacion';
import LoginScreen from './Pages/Auth/LoginScreen';
import RegisterScreen from './Pages/Auth/RegisterScreen';


export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

export type MainStackParamList = {
    Main: undefined;
};

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