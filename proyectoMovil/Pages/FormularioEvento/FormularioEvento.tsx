import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContextEvento } from '../../Providers/ProviderEvento'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormularioEvento() {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [hora, setHora] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [foto, setFoto] = useState<string | undefined>(undefined);
  const { agregarEvento } = useContextEvento();
  const navigation = useNavigation()

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || hora;
    setShowTimePicker(Platform.OS === 'ios');
    setHora(currentTime);
  };

  const handleGuardar = async () => {
    if (!titulo || !fecha) {
      Alert.alert('Error', 'El título y la fecha son obligatorios');
      return;
    }

    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('descripcion', descripcion)
    formData.append('fecha', fecha.toISOString())
    formData.append('hora', hora.toISOString());

    if (foto) {
      const filename = foto.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '')
      const type = match ? `image/${match[1]}` : 'image';
      formData.append('foto', {
        uri: foto,
        name: filename,
        type: type,
      } as any);
    }

    await agregarEvento(formData);
    navigation.goBack();
  }

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitas dar permiso para acceder a la cámara')
      return;
    }

    const results = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!results.canceled) {
      setFoto(results.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Título del evento"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.selectedText}>Fecha seleccionada: {fecha.toLocaleDateString()}</Text>

        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Hora</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={hora}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
        <Text style={styles.selectedText}>
          Hora seleccionada: {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        <TouchableOpacity style={styles.button} onPress={tomarFoto}>
          <Text style={styles.buttonText}>Tomar foto</Text>
        </TouchableOpacity>
        {foto && <Image source={{ uri: foto }} style={styles.previewFoto} />}
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar Evento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#495057',
  },
  previewFoto: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});
