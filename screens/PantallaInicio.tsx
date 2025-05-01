// screens/PantallaInicio.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

const PantallaInicio = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicio</Text>

      <View style={styles.grid}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => navigation.navigate('PantallaAsignarColor')}
        >
          <Text style={styles.icono}>🎨</Text>
          <Text style={styles.buttonTexto}>Color</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => navigation.navigate('Escaneo')}
        >
          <Text style={styles.icono}>📷</Text>
          <Text style={styles.buttonTexto}>Escanear</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#0071ce',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  button: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icono: {
    fontSize: 45,
    marginBottom: 8,
  },
  buttonTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
