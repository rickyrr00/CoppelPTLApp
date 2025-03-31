import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const PantallaTerminos = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.flecha}>←</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Términos y Condiciones</Text>

      <Text style={styles.texto}>
        Aquí van los términos y condiciones de uso del sistema. Puedes modificar este texto con los reales.{"\n\n"}
        1. Uso responsable de la aplicación.{"\n"}
        2. Protección de datos personales.{"\n"}
        3. No compartir contraseñas.{"\n"}
        4. Otros puntos relevantes...
      </Text>
    </ScrollView>
  );
};

export default PantallaTerminos;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  flecha: {
    fontSize: 24,
    color: '#0071ce',
    marginBottom: 10
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
  }
});
