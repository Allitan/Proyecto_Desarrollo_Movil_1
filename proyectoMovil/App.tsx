import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonTabNavegador from './Componentes/ButtonTabNavegacion';
import ProviderEvento from './Providers/ProviderEvento';

export default function App() {
  return (
    <ProviderEvento>
      <NavigatorContainer>
        <ButtonTabNavegador/>
      </NavigatorContainer>
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
