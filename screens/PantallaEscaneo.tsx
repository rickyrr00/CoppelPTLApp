import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PantallaEscaneo = ({ navigation }: any) => {
  return (
    <View style={styles.contenedor}>
      <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoRegresar}>← Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.textoEncima}>Pantalla de escaneo (pendiente)</Text>

      <View style={styles.zonaSimulada}>
        <Text style={styles.textoZona}>Aquí irá el escáner de código de barras</Text>
      </View>
    </View>
  );
};

export default PantallaEscaneo;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  textoRegresar: {
    fontSize: 16,
    color: '#0071ce',
    fontWeight: 'bold',
  },
  textoEncima: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  zonaSimulada: {
    width: '100%',
    height: 300,
    borderWidth: 2,
    borderColor: '#0071ce',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoZona: {
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 10,
  }
});
