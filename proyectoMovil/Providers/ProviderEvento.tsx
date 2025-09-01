import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Evento } from '../Modelos/Eventos'
import { contextEvento } from '../Context/ContextEvento'

interface Props{
    children: ReactNode
}

export default function ProviderEvento({ children }: Props) {
    const [listaEventos, setListaEventos] = useState<Evento[]>([]);

    useEffect(() => {
        listarEventos();
    }, [])

    async function agregarEvento(evento: Evento){
        try{
            const nuevos = [...listaEventos, evento]
            setListaEventos(nuevos);
            await AsyncStorage.setItem("eventos", JSON.stringify(nuevos));
            Alert.alert('Evento guardado correctamente');
        }catch(error){
            Alert.alert('Error al guardar el evento')
        }
    }

    async function listarEventos(){
        try{
            const data = await AsyncStorage.getItem('eventos');
            if(data){
                setListaEventos(JSON.parse(data));
            }
        }catch(error){
            console.log('Error al listar eventos: ', error)
        }
    }

    async function eliminarEvento(id:string) {
        try{
            const filtrados = listaEventos.filter((e) => e.id !== id)
            setListaEventos(filtrados);
            await AsyncStorage.setItem("eventos", JSON.stringify(filtrados));
            Alert.alert('Evento eliminado')
        }catch(error){
            Alert.alert('No se pudo eliminar el evento')
        }
    }


  return (
    <contextEvento.Provider value={{ listaEventos, setListaEventos, agregarEvento, listarEventos, eliminarEvento}}>
        {children}
    </contextEvento.Provider>
  )
}

export function useContextEvento(){
    return useContext(contextEvento)
}