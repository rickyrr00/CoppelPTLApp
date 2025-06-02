import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useUsuarioActivo } from '../hooks/useUsuarioActivo';

const PantallaPerfil = () => {
  const navigation = useNavigation<any>();
  const usuario = useUsuarioActivo();

  const limpiarColor = async (username: string) => {
    try {
      await axios.patch('https://server-zzcb.onrender.com/update-color', {
        username,
        color_hex: '',
        color_index: -1,
      });
    } catch (error: any) {
      console.error('❌ Error limpiando color:', error.response?.data || error.message);
    }
  };

  const cerrarSesion = async () => {
    if (usuario?.username) {
      await limpiarColor(usuario.username);
    }

    await AsyncStorage.removeItem('usuarioLogueado');
    Alert.alert('Sesión cerrada');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>

      {usuario ? (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.valor}>{usuario.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.valor}>{usuario.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.valor}>{usuario.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color asignado:</Text>
            {usuario.color_hex ? (
              <View style={[styles.cuadroColor, { backgroundColor: usuario.color_hex }]} />
            ) : (
              <Text style={styles.valor}>Sin color asignado</Text>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.cargando}>Cargando perfil...</Text>
      )}

      <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
        <Text style={styles.botonTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaPerfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#0071ce',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#0071ce',
    fontWeight: 'bold',
  },
  cuadroColor: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botonCerrar: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginTop: 40,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cargando: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});
