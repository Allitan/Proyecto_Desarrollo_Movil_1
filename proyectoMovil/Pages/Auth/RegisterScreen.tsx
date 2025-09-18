import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Providers/AuthProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../App';

type RegisterScreenProps=NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({navigation}:RegisterScreenProps) {
    const [nombre_usuario, setNombreUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const {register} = useAuth()

    const handleRegister = () => {
        if (!nombre_usuario || !email || !contraseña) {
            Alert.alert('Error', 'Todos los campos son obligatorios.')
            return;
        }
        register(nombre_usuario, email, contraseña)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                value={nombre_usuario}
                onChangeText={setNombreUsuario}
            />
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
            <Button title="Registrar"onPress={handleRegister} />
            <Button
                title="¿Ya tienes cuenta? Inicia Sesión"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});