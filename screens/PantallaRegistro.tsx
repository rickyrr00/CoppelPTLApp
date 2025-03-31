import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

const PantallaRegistro = ({ navigation }: any) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const manejarRegistro = () => {
    console.log({ nombre, correo, contraseña, confirmar });
    navigation.navigate('Login');
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
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

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
    marginBottom: 20,
    fontSize: 16
  },
  boton: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
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
