import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Providers/AuthProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../App';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [hoveredLogin, setHoveredLogin] = useState(false);
    const [hoveredRegister, setHoveredRegister] = useState(false);
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
            <Text style={styles.headerText}>Registro</Text>

            <Image
                source={require('../../assets/Imagen PNG 2.png')}
                style={styles.logo}
            />
            
<Text style={styles.slogan}>Nunca olvides un momento importante...</Text>

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
                onPress={handleLogin}
                onHoverIn={() => setHoveredLogin(true)}
                onHoverOut={() => setHoveredLogin(false)}
                style={styles.textButton}
            >
                <Text style={[styles.textButtonText, hoveredLogin && styles.textHovered]}>
                    Iniciar Sesión
                </Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Register')}
                onHoverIn={() => setHoveredRegister(true)}
                onHoverOut={() => setHoveredRegister(false)}
                style={styles.textButton}
            >
                <Text style={[styles.textButtonText, hoveredRegister && styles.textHovered]}>
                    ¿No tienes cuenta? Regístrate
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
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 30,
    },
    registerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    registerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    arrow: {
        fontSize: 30,
        color: '#03A9F4',
        marginTop: 5,
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
}

});
