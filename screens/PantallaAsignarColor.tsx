import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColorAsignado } from '../utils/colores'; // 👈 importamos el getter del color asignado
import Toast from 'react-native-toast-message';

const PantallaInicio = () => {
  const navigation = useNavigation();

  const irAAsignarColor = () => {
    navigation.navigate('PantallaAsignarColor' as never);
  };

  const irAEscanear = () => {
    const colorActual = getColorAsignado();

    if (!colorActual) {
      Toast.show({
        type: 'error',
        text1: 'Color no asignado',
        text2: 'Primero debes asignarte un color.',
        position: 'bottom',
      });
      return;
    }

    navigation.navigate('Escaneo' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido al sistema PTL</Text>

      <TouchableOpacity style={styles.boton} onPress={irAAsignarColor}>
        <Text style={styles.textoBoton}>Asignar Color</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.boton, styles.botonSecundario]} onPress={irAEscanear}>
        <Text style={styles.textoBoton}>Ir a Escanear</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  boton: {
    backgroundColor: '#0071ce',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  botonSecundario: {
    backgroundColor: '#555',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
