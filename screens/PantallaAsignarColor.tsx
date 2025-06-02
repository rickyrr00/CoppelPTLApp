import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { coloresDisponibles, mapaColores } from '../utils/colores';
import { actualizarColor } from '../services/usuarios';
import { useUsuarioActivo } from '../hooks/useUsuarioActivo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PantallaAsignarColor = ({ navigation }: any) => {
  const usuario = useUsuarioActivo();
  const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null);
  const [coloresOcupados, setColoresOcupados] = useState<string[]>([]);

  useEffect(() => {
    if (usuario?.color_hex) {
      Alert.alert(
        'Color ya asignado',
        'Ya tienes un color asignado. No puedes cambiarlo hasta cerrar sesión.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [usuario]);

  useEffect(() => {
    const cargarColoresOcupados = async () => {
      try {
        const response = await axios.get('https://server-zzcb.onrender.com/get-used-colors');
        const usados = response.data.map((u: any) => u.color_hex).filter(Boolean);
        setColoresOcupados(usados);
      } catch (error) {
        Alert.alert('Error', 'Error al cargar colores ocupados');
      }
    };
    cargarColoresOcupados();
  }, []);

  const seleccionarColor = (color: string) => {
    setColorSeleccionado(color);
  };

  const confirmarColor = async () => {
    if (!colorSeleccionado) {
      Alert.alert('Selecciona un color primero');
      return;
    }

    if (coloresOcupados.includes(colorSeleccionado)) {
      Alert.alert('Color ocupado', 'Elige otro color que esté disponible');
      return;
    }

    try {
      const userId = usuario?.username;
      if (!userId) throw new Error('Falta el ID del usuario');

      const colorIndex = mapaColores[colorSeleccionado];

      await actualizarColor(userId, colorSeleccionado, colorIndex);

      const usuarioActualizado = {
        ...usuario,
        color_hex: colorSeleccionado,
        color_index: colorIndex,
      };

      await AsyncStorage.setItem(
        'usuarioLogueado',
        JSON.stringify({
          data: {
            user: usuarioActualizado,
          },
        })
      );

      Alert.alert('Color asignado', `Tu color ahora es: ${colorSeleccionado}`);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar el color');
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const ocupado = coloresOcupados.includes(item);
    const seleccionado = item === colorSeleccionado;

    return (
      <TouchableOpacity
        style={[
          styles.colorCuadro,
          { backgroundColor: item },
          ocupado && styles.colorOcupado,
          seleccionado && styles.colorSeleccionado,
        ]}
        onPress={() => !ocupado && seleccionarColor(item)}
        disabled={ocupado}
      >
        {ocupado && <Text style={styles.textoOcupado}>X</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoRegresar}>← Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Selecciona tu color</Text>

      <FlatList
        data={coloresDisponibles}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.listaColores}
      />

      <TouchableOpacity style={styles.botonConfirmar} onPress={confirmarColor}>
        <Text style={styles.textoConfirmar}>Confirmar Color</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaAsignarColor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  botonRegresar: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  textoRegresar: {
    fontSize: 18,
    color: '#0071ce',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listaColores: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCuadro: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOcupado: {
    opacity: 0.4,
  },
  colorSeleccionado: {
    borderWidth: 3,
    borderColor: '#0071ce',
  },
  textoOcupado: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
    position: 'absolute',
  },
  botonConfirmar: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  textoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
