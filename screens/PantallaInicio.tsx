import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PantallaInicio = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a la app de Coppel v2</Text>
      <Text style={styles.texto}>Desde aquí podrás explorar las funciones principales.</Text>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
