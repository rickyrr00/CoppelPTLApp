import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PantallaRegistro = ({ navigation }: any) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmar: '',
  });

  const validarCorreo = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const manejarRegistro = async () => {
    const nuevosErrores = {
      nombre: nombre ? '' : 'El nombre es obligatorio',
      correo: validarCorreo(correo) ? '' : 'Correo no válido',
      contraseña: contraseña ? '' : 'La contraseña es obligatoria',
      confirmar: confirmar === contraseña ? '' : 'Las contraseñas no coinciden',
    };

    setErrores(nuevosErrores);
    const hayErrores = Object.values(nuevosErrores).some(error => error !== '');

    if (!hayErrores) {
      const nuevoUsuario = { nombre, correo, contraseña };
      try {
        await AsyncStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error guardando usuario:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#aaa"
      />
      {errores.nombre ? <Text style={styles.error}>{errores.nombre}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      {errores.correo ? <Text style={styles.error}>{errores.correo}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {errores.contraseña ? <Text style={styles.error}>{errores.contraseña}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {errores.confirmar ? <Text style={styles.error}>{errores.confirmar}</Text> : null}

      <TouchableOpacity style={styles.boton} onPress={manejarRegistro}>
        <Text style={styles.textoBoton}>Registrarme</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.textoFooter}>Al registrarte aceptas los</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Terminos')}>
          <Text style={styles.linkFooter}>términos y condiciones</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PantallaRegistro;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
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
    justifyContent: 'center',
    flexWrap: 'wrap'
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
