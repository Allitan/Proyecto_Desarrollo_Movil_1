import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNotificaciones } from '../../Providers/ProviderNotificacion';
import { Notificacion } from '../../Modelos/Notificacion';

export default function HistorialNotificaciones() {
  const { notificaciones } = useNotificaciones();

  const renderItem = ({ item }: { item: Notificacion }) => (
    <View style={styles.notificacionCard}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.cuerpo}>{item.cuerpo}</Text>
      <Text style={styles.fecha}>{item.fecha.toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notificaciones.length === 0 ? (
        <Text style={styles.noNotificationsText}>No hay notificaciones en el historial.</Text>
      ) : (
        <FlatList
          data={notificaciones.sort((a, b) => b.fecha.getTime() - a.fecha.getTime())}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e9ecef', // Gris suave tipo Bootstrap
  },
  notificacionCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#343a40',
  },
  cuerpo: {
    fontSize: 15,
    color: '#495057',
  },
  fecha: {
    fontSize: 12,
    color: '#868e96',
    marginTop: 8,
    textAlign: 'right',
  },
  noNotificationsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6c757d',
  },
});
