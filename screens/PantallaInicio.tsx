import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PantallaInicio = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menú Principal</Text>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('PantallaAsignarColor')}>
        <Text style={styles.botonTexto}>Asignar Color</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Escaneo')}>
        <Text style={styles.botonTexto}>Ir a Escaneo</Text>
      </TouchableOpacity>

      {/* Agregar más opciones aquí en el futuro */}
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  boton: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
