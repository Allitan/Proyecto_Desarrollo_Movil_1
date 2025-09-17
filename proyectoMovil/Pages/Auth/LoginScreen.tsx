import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Providers/AuthProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../App';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        if (!email || !contraseña) {
            Alert.alert('Error', 'Por favor, ingresa tu email y contraseña.');
            return;
        }
        login(email, contraseña);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={contraseña}
                onChangeText={setContraseña}
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Button
                title="¿No tienes cuenta? Regístrate"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});