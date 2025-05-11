import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '../hooks/useNetInfo';
import { escanearSKU } from '../services/api';

const PantallaEscaneo = ({ navigation }: any) => {
  const [skuInput, setSkuInput] = useState('');
  const [producto, setProducto] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [colorAsignado, setColorAsignado] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState<number | null>(null);
  const inputRef = useRef<TextInput>(null);
  const inputTimestamp = useRef<number | null>(null);
  const isConnected = useNetInfo();

  useEffect(() => {
    const verificarColor = async () => {
      const color = await AsyncStorage.getItem('colorAsignado');
      const index = await AsyncStorage.getItem('colorIndex');

      if (color && index) {
        setColorAsignado(color);
        setColorIndex(Number(index));
      } else {
        Toast.show({
          type: 'error',
          text1: 'No tienes color asignado',
          text2: 'Primero debes asignar un color',
          position: 'bottom',
        });
        navigation.navigate('Inicio');
      }
    };

    verificarColor();
  }, []);

  const buscarProductoAuto = async (skuEscaneado: string) => {
    const sku = skuEscaneado.trim();
    if (!sku) return;

    Keyboard.dismiss();
    setCargando(true);
    setProducto(null);

    try {
      const data = await escanearSKU(sku, colorIndex);
      setSkuInput('');
      inputRef.current?.clear();

      setProducto({
        sku,
        coordenada: `Cubby: ${data.assignedCubby}`,
        articulo: data.productName,
        orden: '',
        detalle: '',
      });

      Toast.show({
        type: 'success',
        text1: 'Producto encontrado',
        text2: `SKU: ${sku}`,
        position: 'bottom',
      });
    } catch (error: any) {
      console.error('❌ Error en escaneo:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.detail?.[0]?.msg || error.message,
        position: 'bottom',
      });
    }

    setCargando(false);
  };

  const buscarProducto = () => {
    if (skuInput.trim()) {
      buscarProductoAuto(skuInput);
    }
  };

  const limpiar = () => {
    setSkuInput('');
    setProducto(null);
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoRegresar}>← Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Escaneo de producto</Text>

      {colorAsignado && (
        <View style={[styles.colorAsignado, { backgroundColor: colorAsignado }]}>
          <Text style={styles.colorAsignadoTexto}>Tu color: {colorAsignado}</Text>
        </View>
      )}

      {!isConnected && (
        <View style={styles.bannerOffline}>
          <Text style={styles.textoOffline}>Estás sin conexión a internet</Text>
        </View>
      )}

      <Text style={styles.textoGuia}>
        Escanea un producto o escribe el SKU manualmente
      </Text>

      <View style={styles.inputGroup}>
        <TextInput
          ref={inputRef}
          style={styles.inputVisible}
          placeholder="Escribe el SKU"
          onChangeText={(text) => {
            setSkuInput(text);
            if (text.length >= 5) {
              const now = Date.now();
              if (inputTimestamp.current && now - inputTimestamp.current < 100) {
                buscarProductoAuto(text);
              }
              inputTimestamp.current = now;
            }
          }}
          value={skuInput}
          autoFocus
        />
        <TouchableOpacity style={styles.botonBuscar} onPress={buscarProducto}>
          <Text style={styles.textoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultadoContainer}>
        {cargando ? (
          <ActivityIndicator size="large" color="#0071ce" />
        ) : producto ? (
          <>
            <Text style={styles.resultadoTexto}>🔎 Resultado del escaneo:</Text>
            <Text style={styles.linea}>SKU: {producto.sku}</Text>
            <Text style={styles.linea}>Coordenada: {producto.coordenada}</Text>
            <Text style={styles.linea}>Artículo: {producto.articulo}</Text>
            <Text style={styles.linea}># Orden: {producto.orden}</Text>
            <Text style={styles.linea}>Detalle: {producto.detalle}</Text>
            <TouchableOpacity style={styles.botonClear} onPress={limpiar}>
              <Text style={styles.textoClear}>Borrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.resultadoTexto}>Escanea o escribe un SKU</Text>
        )}
      </View>
    </View>
  );
};

export default PantallaEscaneo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  colorAsignado: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  colorAsignadoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoGuia: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputVisible: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    fontSize: 18,
    borderRadius: 8,
  },
  botonBuscar: {
    backgroundColor: '#0071ce',
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultadoContainer: {
    borderWidth: 2,
    borderColor: '#0071ce',
    borderRadius: 10,
    padding: 20,
    minHeight: 250,
    justifyContent: 'center',
  },
  resultadoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  linea: {
    fontSize: 16,
    color: '#0071ce',
    marginBottom: 6,
  },
  botonClear: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  textoClear: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bannerOffline: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textoOffline: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
