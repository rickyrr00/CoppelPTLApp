import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { coloresDisponibles } from '../utils/colores';

const PantallaAsignarColor = () => {
  const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const asignarColor = async (color: string) => {
    try {
      await AsyncStorage.setItem('colorAsignado', color);
      setColorSeleccionado(color);
      Alert.alert('Color asignado', `Tu color es: ${color}`);
      navigation.goBack();
    } catch (error) {
      console.log('Error asignando color:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona un Color</Text>
      <View style={styles.grid}>
        {coloresDisponibles.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => asignarColor(color)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.botonCancelarTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaAsignarColor;

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
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBox: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
  },
  botonCancelar: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCancelarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
