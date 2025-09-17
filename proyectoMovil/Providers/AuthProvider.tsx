import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

interface AuthContextType{
    isLoggedIn: boolean;
    login: (email: string, contraseña: string) => Promise<void>;
    register: (nombre_usuario: string, email: string, contraseña: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = 'http://192.168.79.168:3000/api/auth';
interface Props { children: ReactNode; }

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (email:string, contraseña:string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, contraseña }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                Alert.alert('Éxito', data.mensaje);
            } else {
                Alert.alert('Error', data.error || 'Credenciales incorrectas');
            }
        } catch (e) {
            Alert.alert('Error', 'No se pudo iniciar sesión. Revisa tu conexión.');
        }
    };

    const register = async (nombre_usuario:string, email :string, contraseña:string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_usuario, email, contraseña }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', data.mensaje);
            } else {
                Alert.alert('Error', data.error || 'Error en el registro');
            }
        } catch (e) {
            Alert.alert('Error', 'No se pudo registrar. Revisa tu conexión.');
        }
    };

    const logout = () => { setIsLoggedIn(false); };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) { throw new Error('useAuth debe ser usado dentro de un AuthProvider'); }
    return context;
};