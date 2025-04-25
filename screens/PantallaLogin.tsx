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

const PantallaLogin = () => {
  const navigation = useNavigation<any>();
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({ identificador: '', contrasena: '' });

  const validarCorreo = (correo: string) => /\S+@\S+\.\S+/.test(correo);

  const handleLogin = async () => {
    let erroresTemp = { identificador: '', contrasena: '' };

    if (!identificador.trim()) erroresTemp.identificador = 'Ingresa tu correo o usuario';
    if (!contrasena.trim()) erroresTemp.contrasena = 'Ingresa tu contraseña';

    setErrores(erroresTemp);
    if (erroresTemp.identificador || erroresTemp.contrasena) return;

    // Intenta buscar por correo o por username
    const id = identificador.toLowerCase();
    const usuarioJSON = await AsyncStorage.getItem(`usuario_${id}`);

    if (!usuarioJSON) {
      Alert.alert('Usuario no encontrado');
      return;
    }

    const usuario = JSON.parse(usuarioJSON);

    if (usuario.contrasena !== contrasena) {
      Alert.alert('Contraseña incorrecta');
      return;
    }

    await AsyncStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Iniciar sesión</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Correo o nombre de usuario"
          autoCapitalize="none"
          value={identificador}
          onChangeText={setIdentificador}
        />
        {errores.identificador ? <Text style={styles.error}>{errores.identificador}</Text> : null}
  
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />
        {errores.contrasena ? <Text style={styles.error}>{errores.contrasena}</Text> : null}
  
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
    justifyContent: 'center', // centrado vertical
    alignItems: 'center',     // centrado horizontal
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
  },
  link: {
    color: '#0071ce',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
