import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'https://server-zzcb.onrender.com';

const PantallaLogin = () => {
  const navigation = useNavigation<any>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({ identifier: '', password: '' });

  const handleLogin = async () => {
    setErrores({ identifier: '', password: '' });

    if (!identifier.trim()) {
      setErrores((prev) => ({ ...prev, identifier: 'Ingresa tu correo o usuario' }));
      return;
    }
    if (!password.trim()) {
      setErrores((prev) => ({ ...prev, password: 'Ingresa tu contraseña' }));
      return;
    }

    try {
      const response = await axios.post("https://server-zzcb.onrender.com/login", { identifier,  password });

      console.log (response)
      // Guardar sesión local
      await AsyncStorage.setItem('usuarioLogueado', JSON.stringify(response));

      // Navegar a la app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Iniciar sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo o nombre de usuario"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
        />
        {errores.identifier ? <Text style={styles.error}>{errores.identifier}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errores.password ? <Text style={styles.error}>{errores.password}</Text> : null}

        <TouchableOpacity style={styles.boton} onPress={handleLogin}>
          <Text style={styles.botonTexto}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PantallaLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  link: {
    color: '#0071ce',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
