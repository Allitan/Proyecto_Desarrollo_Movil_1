import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Evento } from '../Modelos/Eventos'
import { contextEvento } from '../Context/ContextEvento'
import * as Notifications from 'expo-notifications';

interface Props{
    children: ReactNode
}

const BACKEND_URL = 'http://192.168.79.168:3000/api/eventos'; 

export default function ProviderEvento({ children }: Props) {
    const [listaEventos, setListaEventos] = useState<Evento[]>([]);

    useEffect(() => {
        listarEventos();
    }, [])

    async function agregarEvento(eventoFormData: FormData){
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                body: eventoFormData,
            });
            if (!response.ok) {
                throw new Error('Error al guardar el evento en el servidor');
            }

            const newEvent:Evento =await response.json()

            console.log('Datos del evento recibidos del servidor:', newEvent);
            console.log('Fecha del evento:', newEvent.fecha);
            console.log('Hora del evento:', newEvent.hora);

            Alert.alert('Éxito', 'Evento guardado correctamente');
            await listarEventos();

            //Compañeros aqui agendamos la notificacion
            const eventDate = new Date(newEvent.fecha)
            const eventTime = new Date(newEvent.hora)

            const scheduleDate = new Date(
                eventDate.getFullYear(),
                eventDate.getMonth(),
                eventDate.getDate(),
                eventTime.getHours(),
                eventTime.getMinutes(),
            );

            const secondsUntilEvent = (scheduleDate.getTime() - new Date().getTime()) / 1000;
            const trigger: Notifications.NotificationTriggerInput = {
                seconds: secondsUntilEvent,
                type: 'seconds',
            } 

            if (secondsUntilEvent > 0) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `¡Recordatorio de evento! 🔔`,
                        body: `No olvides tu evento: ${newEvent.titulo}`,
                    },
                    trigger,
                });
            }
        } catch (error) {
            console.error('Error en agregarEvento:', error);
            Alert.alert('Error', 'No se pudo guardar el evento');
        }
    }

    async function listarEventos(){
        try{
            const response = await fetch(BACKEND_URL);
            if (!response.ok) {
                throw new Error('Error de red al obtener eventos');
            }
            const data = await response.json();
            const eventosConFechas = data.map((evento: any) => ({
                ...evento,
                fecha: new Date(evento.fecha),
                hora: new Date(evento.hora)
            }));
            setListaEventos(eventosConFechas);
        }catch(error){
            console.log('Error al listar eventos: ', error)
            Alert.alert('Error', 'No se pudieron cargar los eventos desde el servidor')
        }
    }

    async function eliminarEvento(id: number) {
        try {
            const response = await fetch(`${BACKEND_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el evento.');
            }
            await listarEventos();
            Alert.alert('Evento eliminado');
        }catch(error){
            Alert.alert('No se pudo eliminar el evento')
        }
    }


  return (
    <contextEvento.Provider value={{ listaEventos, agregarEvento, listarEventos, eliminarEvento}}>
        {children}
    </contextEvento.Provider>
  )
}

export function useContextEvento(){
    return useContext(contextEvento)
}