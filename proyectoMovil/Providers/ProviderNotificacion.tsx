import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Notificacion } from '../Modelos/Notificacion';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificacionContextType {
    notificaciones: Notificacion[];
    agregarNotificacion: (titulo: string, cuerpo: string) => void;
    notificacionesHabilitadas: boolean;
    setNotificacionesHabilitadas: (habilitado: boolean) => Promise<void>;
}

const NotificacionContext = createContext<NotificacionContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const NotificacionProvider = ({ children }: Props) => {
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
    const [notificacionesHabilitadas, setNotificacionesHabilitadas] = useState(false);

    useEffect(() => {
        const cargarEstado = async () => {
            const estadoGuardado = await AsyncStorage.getItem('notificacionesHabilitadas');
            if (estadoGuardado !== null) {
                setNotificacionesHabilitadas(JSON.parse(estadoGuardado));
            }
        };
        cargarEstado();
    }, []);

    const agregarNotificacion = (titulo: string, cuerpo: string) => {
        const nuevaNotificacion: Notificacion = {
            id: Math.random().toString(),
            titulo,
            cuerpo,
            fecha: new Date(),
        };
        setNotificaciones(prev => [...prev, nuevaNotificacion]);
    };

    const toggleHabilitado = async (habilitado: boolean) => {
        setNotificacionesHabilitadas(habilitado);
        await AsyncStorage.setItem('notificacionesHabilitadas', JSON.stringify(habilitado));

        if (habilitado) {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'No se podrán enviar notificaciones. Por favor, habilítalas en la configuración de tu dispositivo.');
                setNotificacionesHabilitadas(false);
                await AsyncStorage.setItem('notificacionesHabilitadas', JSON.stringify(false));
            }
        } else {
            Alert.alert('Notificaciones desactivadas', 'Ya no recibirás notificaciones.');
            Notifications.cancelAllScheduledNotificationsAsync();
        }
    };

    return (
        <NotificacionContext.Provider value={{ notificaciones, agregarNotificacion, notificacionesHabilitadas, setNotificacionesHabilitadas: toggleHabilitado }}>
            {children}
        </NotificacionContext.Provider>
    );
};

export const useNotificaciones = () => {
    const context = useContext(NotificacionContext);
    if (!context) {
        throw new Error('useNotificaciones debe ser utilizado dentro de un NotificacionProvider');
    }
    return context;
};