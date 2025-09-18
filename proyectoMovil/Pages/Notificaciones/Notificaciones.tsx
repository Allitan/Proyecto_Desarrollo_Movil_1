import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNotificaciones } from '../../Providers/ProviderNotificacion';
import { Notificacion } from '../../Modelos/Notificacion';

export default function HistorialNotificaciones() {
  const {notificaciones} = useNotificaciones();

  const renderItem = ({ item }: {item: Notificacion}) => (
    <View style={styles.notificacionCard}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text>{item.cuerpo}</Text>
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  notificacionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  titulo: { fontWeight: 'bold', fontSize: 16 },
  fecha: { fontSize: 12, color: '#666', marginTop: 5 },
  noNotificationsText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});
