import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PantallaLogin = ({ navigation }: any) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const manejarLogin = () => {
    console.log('Correo:', correo);
    console.log('Contraseña:', contraseña);
    navigation.navigate('Escaneo'); // Ir directo a la pantalla de escaneo
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
      <TextInput
        style={styles.input}
        placeholder="********"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

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
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    height: 50, borderWidth: 1, borderColor: '#eee', backgroundColor: '#f9f9f9',
    borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, fontSize: 16
  },
  boton: {
    backgroundColor: '#0071ce', padding: 15, borderRadius: 8, alignItems: 'center'
  },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
  footer: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  textoFooter: { color: '#999', marginRight: 5 },
  linkFooter: { color: '#0071ce', fontWeight: 'bold' }
});
