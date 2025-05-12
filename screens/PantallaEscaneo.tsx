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
  const isConnected = useNetInfo();

  useEffect(() => {
    const verificarColor = async () => {
      const color = await AsyncStorage.getItem('colorAsignado');
      const index = await AsyncStorage.getItem('colorIndex');
      if (color && index !== null && !isNaN(Number(index))) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const buscarProductoAuto = async (sku: string) => {
    if (!sku.trim()) return;
    if (colorIndex === null) return;

    setCargando(true);
    setProducto(null);
    Keyboard.dismiss();

    try {
      const data = await escanearSKU(sku.trim(), colorIndex);
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

  const limpiar = () => {
    setSkuInput('');
    setProducto(null);
    inputRef.current?.clear();
    inputRef.current?.focus(); // reenfoca para el siguiente escaneo
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

      <Text style={styles.textoGuia}>Escanea un producto con el lector físico</Text>

      {/* Input visible para capturar escaneo */}
      <View style={styles.inputCaptura}>
        <TextInput
          ref={inputRef}
          style={styles.inputVisible}
          placeholder="Escanea un SKU"
          value={skuInput}
          onChangeText={(text) => {
            setSkuInput(text);
            console.log('🧪 Recibido:', text);
            if (text.length >= 6) {
              buscarProductoAuto(text);
            }
          }}
          autoFocus
          showSoftInputOnFocus={false}
          keyboardType="numeric"
        />
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
          <Text style={styles.resultadoTexto}>Esperando escaneo...</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  textoGuia: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  inputCaptura: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputVisible: {
    height: 50,
    width: 220,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 8,
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
});
