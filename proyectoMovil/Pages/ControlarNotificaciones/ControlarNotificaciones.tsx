import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useNotificaciones } from "../../Providers/ProviderNotificacion";

const NotificationsScreen: React.FC = () => {
  const { notificacionesHabilitadas, setNotificacionesHabilitadas} = useNotificaciones()

  const handleToggle = ()=>{
    setNotificacionesHabilitadas(!notificacionesHabilitadas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Deseas recibir notificaciones?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={notificacionesHabilitadas ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggle}
        value={notificacionesHabilitadas}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles =StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});