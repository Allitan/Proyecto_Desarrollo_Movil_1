import { View, Text, Alert, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContextEvento } from '../../Providers/ProviderEvento'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function FormularioEvento() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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

    const fechaHoraCombinada = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      hora.getHours(),
      hora.getMinutes()
    );


    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('descripcion', descripcion)
    formData.append('fechaHora', fechaHoraCombinada.toISOString());

    if (foto) {
      const filename = foto.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitas dar permiso para acceder a la camara')
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
      <Text style={styles.selectedText}>
        Fecha seleccionada: {fecha.toLocaleDateString()}
      </Text>
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
      <Button title='Tomar foto' onPress={tomarFoto} />
      {foto && <Text style={styles.fotoText}>Foto adjuntada</Text>}
      <Button title='Guardar Evento' onPress={handleGuardar} />
    </View>
  );
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
  button: {
    backgroundColor: '#03A9F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});
