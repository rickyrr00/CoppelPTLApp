import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PantallaInicio = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Inicio</Text>

      <View style={styles.botonesContainer}>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('PantallaAsignarColor')}
        >
          <Image
            source={require('../assets/IconAssets/led-icon.png')}
            style={styles.icono}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Color</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Escaneo')}
        >
          <Image
            source={require('../assets/IconAssets/scan-icon.png')}
            style={styles.icono}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Escanear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Historial')}
        >
          <Image
            source={require('../assets/IconAssets/historial-icon.png')}
            style={styles.icono}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Historial</Text>
        </TouchableOpacity>

        {/* Puedes seguir agregando más botones aquí */}
      </View>
    </ScrollView>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0071ce',
    marginBottom: 30,
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icono: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
