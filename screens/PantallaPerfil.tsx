import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PantallaPerfil = () => {
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const datos = await AsyncStorage.getItem('usuario');
      if (datos) {
        setUsuario(JSON.parse(datos));
      }
    };
    cargarUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil del Usuario</Text>
      {usuario ? (
        <Text style={styles.nombre}>¡Hola, {usuario.nombre}!</Text>
      ) : (
        <Text style={styles.nombre}>Cargando datos...</Text>
      )}
    </View>
  );
};

export default PantallaPerfil;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  nombre: { fontSize: 20, color: '#333', textAlign: 'center' }
});
