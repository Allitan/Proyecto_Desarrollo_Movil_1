import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationsScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    if (newValue) {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se podrán enviar notificaciones.");
        setIsEnabled(false);
        return;
      }

      Alert.alert("Notificaciones habilitadas", "Se enviará una notificación de prueba en 5s.");
    } else {
      Alert.alert("Notificaciones desactivadas", "Ya no recibirás notificaciones.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Deseas recibir notificaciones?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggle}
        value={isEnabled}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
