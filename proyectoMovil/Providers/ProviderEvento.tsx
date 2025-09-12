import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Evento } from '../Modelos/Eventos'
import { contextEvento } from '../Context/ContextEvento'

interface Props{
    children: ReactNode
}

const BACKEND_URL = 'http://192.168.79.168:3000/api/eventos'; 

export default function ProviderEvento({ children }: Props) {
    const [listaEventos, setListaEventos] = useState<Evento[]>([]);

    useEffect(() => {
        listarEventos();
    }, [])

    async function agregarEvento(evento: Evento){
        await listarEventos();
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