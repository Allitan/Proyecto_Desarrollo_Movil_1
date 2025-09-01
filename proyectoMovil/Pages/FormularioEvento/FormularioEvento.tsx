import { View, Text, Alert, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContextEvento } from '../../Providers/ProviderEvento'
import { Evento } from '../../Modelos/Eventos'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'


export default function FormularioEvento() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [foto, setFoto] = useState<string | undefined>(undefined);
    const { agregarEvento} = useContextEvento();
    const navigation = useNavigation()

    const handleGuardar = async () => {
        if(!titulo||!fecha){
            Alert.alert('Error', 'El titulo y la fecha son obligatorios.');
            return;
        }

        const nuevoEvento : Evento = {
            id: uuidv4(),
            titulo,
            descripcion,
            fecha,
            foto,
        }

        agregarEvento(nuevoEvento);
        navigation.goBack();
    }

    const tomarFoto = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Permiso denegado', 'Necesitas dar permiso para acceder a la camara.')
            return;
        }

        const results = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!results.canceled){
            setFoto(results.assets[0].uri)
        }
    }

  return (
    <View style={styles.container}>
        <TextInput
         style={styles.input}
         placeholder="Título del evento"
         value={titulo}
         onChangeText={setTitulo}/>

        <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline/>

        <TextInput
        style={styles.input}
        placeholder="Fecha (Ej: 2025-10-27)"
        value={fecha}
        onChangeText={setFecha}/>

        <Button title='Tomar foto' onPress={tomarFoto}/>
        {foto && <Text style={styles.fotoText}>Foto adjuntada</Text>}
        <Button title='Guardar Evento' onPress={handleGuardar}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  fotoText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'green',
  },
});
