import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Providers/AuthProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../App';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [hoveredRegisterBtn, setHoveredRegisterBtn] = useState(false);
    const [hoveredLoginBtn, setHoveredLoginBtn] = useState(false);
    const { register } = useAuth();

    const handleRegister = () => {
        if (!nombre_usuario || !email || !contraseña) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }
        register(nombre_usuario, email, contraseña);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Registro</Text>

          
            

            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                placeholderTextColor="#000"
                value={nombre_usuario}
                onChangeText={setNombreUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#000"
                secureTextEntry
                value={contraseña}
                onChangeText={setContraseña}
            />

            <Pressable
                onPress={handleRegister}
                onHoverIn={() => setHoveredRegisterBtn(true)}
                onHoverOut={() => setHoveredRegisterBtn(false)}
                style={styles.textButton}
            >
                <Text style={[styles.textButtonText, hoveredRegisterBtn && styles.textHovered]}>
                    Registrar
                </Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Login')}
                onHoverIn={() => setHoveredLoginBtn(true)}
                onHoverOut={() => setHoveredLoginBtn(false)}
                style={styles.textButton}
            >
                <Text style={[styles.textButtonText, hoveredLoginBtn && styles.textHovered]}>
                    ¿Ya tienes cuenta? Inicia Sesión
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'sans-serif-medium',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#000',
    },
    textButton: {
        marginVertical: 10,
        paddingVertical: 10,
    },
    textButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
    },
    textHovered: {
        color: '#03A9F4', // cambia el color al pasar el cursor
    },
    slogan: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
});
