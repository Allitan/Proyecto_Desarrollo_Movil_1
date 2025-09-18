import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useNotificaciones } from "../../Providers/ProviderNotificacion";

const NotificationsScreen: React.FC = () => {
  const { notificacionesHabilitadas, setNotificacionesHabilitadas } = useNotificaciones();

  const handleToggle = () => {
    setNotificacionesHabilitadas(!notificacionesHabilitadas);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>¿Deseas recibir notificaciones?</Text>
        <Switch
          trackColor={{ false: "#adb5bd", true: "#007bff" }}
          thumbColor={notificacionesHabilitadas ? "#ffc107" : "#f8f9fa"}
          ios_backgroundColor="#6c757d"
          onValueChange={handleToggle}
          value={notificacionesHabilitadas}
        />
      </View>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#343a40",
    textAlign: "center",
  },
});
