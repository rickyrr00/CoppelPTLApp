import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { limpiarColorAsignado } from '../utils/colores'; // importamos función para liberar color

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
    limpiarColorAsignado(); // Liberar el color cuando cierra sesión
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
        <>
          <Text style={styles.info}>👤 Nombre: <Text style={styles.valor}>{usuario.nombre}</Text></Text>
          <Text style={styles.info}>🆔 Usuario: <Text style={styles.valor}>{usuario.username}</Text></Text>
          <Text style={styles.info}>📧 Correo: <Text style={styles.valor}>{usuario.correo}</Text></Text>

          <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
            <Text style={styles.botonTexto}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.cargando}>Cargando perfil...</Text>
      )}
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
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  valor: {
    fontWeight: 'bold',
    color: '#0071ce',
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
