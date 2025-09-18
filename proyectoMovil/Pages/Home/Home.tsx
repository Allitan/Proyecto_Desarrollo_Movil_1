import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContextEvento } from '../../Providers/ProviderEvento';
import { Evento } from '../../Modelos/Eventos';

const BACKEND_BASE_URL = 'http://192.168.79.168:3000';

export default function Home() {
  const { listaEventos, eliminarEvento } = useContextEvento();
  const navigation = useNavigation();

  const confirmarEliminar = (id: number) => {
    Alert.alert("Confirmar Eliminación", "¿Estás seguro de que deseas eliminar este evento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => eliminarEvento(id), style: "destructive" }
      ]
    )
  }

  const renderItem = ({ item }: { item: Evento }) => (
    <View style={styles.eventoCard}>
      {item.foto && <Image source={{ uri: `${BACKEND_BASE_URL}${item.foto}` }} style={styles.foto} />}
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.fecha}>Fecha: {item.fecha.toLocaleDateString()}</Text>
      <Text style={styles.hora}>Hora: {item.hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <TouchableOpacity style={styles.eliminarBoton} onPress={() => confirmarEliminar(item.id)}>
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa', // gris claro tipo Bootstrap
  },
  eventoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#495057',
    marginVertical: 6,
  },
  fecha: {
    fontSize: 14,
    color: '#868e96',
  },
  hora: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 8,
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  eliminarBoton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  eliminarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#0d6efd', // azul Bootstrap
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#6c757d',
  },
});
