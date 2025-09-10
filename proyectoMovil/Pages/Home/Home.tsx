import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContextEvento } from '../../Providers/ProviderEvento';
import { Evento } from '../../Modelos/Eventos';

export default function Home() {
  const { listaEventos, eliminarEvento } = useContextEvento();
  const navigation = useNavigation();

  const confirmarEliminar = (id: string)=> {
    Alert.alert("Confirmar Eliminacion", "¿Estás seguro de que deseas eliminar este evento?",
      [
        {
          text: "Cancelar",
          style:"cancel"
        },
        {
          text: "Eliminar",
          onPress: () => eliminarEvento(id),
          style: "destructive"
        }
      ]
    )
  }

  const renderItem = ({ item }: { item: Evento }) => (
    <View style={styles.eventoCard}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text>{item.descripcion}</Text>
      <Text>Fecha: {item.fecha.toLocaleDateString()}</Text>
      <Text>Hora: {item.hora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
      {item.foto && <Image source={{ uri: item.foto }} style={styles.foto} />}
      <TouchableOpacity style={styles.eliminarBoton} onPress={()=> confirmarEliminar(item.id)}>
        <Text style={styles.eliminarTexto}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {listaEventos.length === 0 ? (
        <Text style={styles.noEventsText}>Aún no hay eventos, ¡crea uno!</Text>
      ) : (
        <FlatList
          data={listaEventos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormularioEvento')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  eventoCard: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: { fontSize: 24, color: 'white' },
  noEventsText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  foto: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  eliminarBoton: {
    marginTop: 10,
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  eliminarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  }
});