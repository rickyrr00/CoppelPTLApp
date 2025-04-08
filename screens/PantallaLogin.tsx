import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PantallaLogin = ({ navigation }: any) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errores, setErrores] = useState({ correo: '', contraseña: '', general: '' });

  const validarCorreo = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const manejarLogin = async () => {
    const nuevosErrores = {
      correo: validarCorreo(correo) ? '' : 'Correo inválido',
      contraseña: contraseña ? '' : 'La contraseña es obligatoria',
      general: ''
    };

    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some(error => error !== '');
    if (hayErrores) return;

    try {
      const datosGuardados = await AsyncStorage.getItem('usuarioRegistrado');
      if (!datosGuardados) {
        setErrores({ ...nuevosErrores, general: 'No hay usuarios registrados' });
        return;
      }

      const usuario = JSON.parse(datosGuardados);
      if (usuario.correo === correo && usuario.contraseña === contraseña) {
        navigation.navigate('Tabs');
      } else {
        setErrores({ ...nuevosErrores, general: 'Correo o contraseña incorrectos' });
      }
    } catch (error) {
      console.error('Error leyendo usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entra a tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="ej: jon.smith@email.com"
        value={correo}
        onChangeText={setCorreo}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
      />
      {errores.correo ? <Text style={styles.error}>{errores.correo}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="********"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {errores.contraseña ? <Text style={styles.error}>{errores.contraseña}</Text> : null}

      {errores.general ? <Text style={styles.error}>{errores.general}</Text> : null}

      <TouchableOpacity style={styles.boton} onPress={manejarLogin}>
        <Text style={styles.textoBoton}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.textoFooter}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.linkFooter}>REGÍSTRATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PantallaLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13
  },
  boton: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textoFooter: {
    color: '#999',
    marginRight: 5
  },
  linkFooter: {
    color: '#0071ce',
    fontWeight: 'bold'
  }
});
