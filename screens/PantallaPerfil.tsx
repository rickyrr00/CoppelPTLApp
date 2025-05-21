import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { limpiarColorAsignado } from '../utils/colores';

const PantallaPerfil = () => {
  const navigation = useNavigation<any>();
  const [usuario, setUsuario] = useState<{ nombre: string; username: string; correo: string } | null>(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const usuarioLogueado = await AsyncStorage.getItem('usuarioLogueado');
      if (usuarioLogueado) {
        const datos = JSON.parse(usuarioLogueado);
        setUsuario({
          nombre: datos.nombre,
          username: datos.username,
          correo: datos.correo,
        });
      }
    };
    obtenerUsuario();
  }, []);

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('usuarioLogueado');
    limpiarColorAsignado();
    Alert.alert('Sesión cerrada', 'Tu color ha sido liberado.');
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
            <Text style={styles.valor}>{usuario.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.valor}>{usuario.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.valor}>{usuario.correo}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
