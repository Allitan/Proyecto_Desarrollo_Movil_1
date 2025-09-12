import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonTabNavegador from './Componentes/ButtonTabNavegacion';
import ProviderEvento from './Providers/ProviderEvento';
import * as Notifications from "expo-notifications";

export default function App() {
  return (
    <ProviderEvento>
        <ButtonTabNavegador/>
    </ProviderEvento>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
