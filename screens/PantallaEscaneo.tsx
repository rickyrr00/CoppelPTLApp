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
import { useNetInfo } from '../hooks/useNetInfo';
import { useUsuarioActivo } from '../hooks/useUsuarioActivo';
import { escanearSKU } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const PantallaEscaneo = ({ navigation }: any) => {
  const [producto, setProducto] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const isConnected = useNetInfo();
  const usuario = useUsuarioActivo();

  const colorAsignado = usuario?.color_hex || null;
  const colorIndex = usuario?.color_index ?? null;

  useEffect(() => {
    if (!colorAsignado || colorIndex === null) {
      Toast.show({
        type: 'error',
        text1: 'Color no asignado',
        text2: 'Debes asignar un color antes de escanear',
        position: 'bottom',
      });
      navigation.navigate('Inicio');
    }
  }, [colorAsignado, colorIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const buscarProductoAuto = async (sku: string) => {
    if (!sku.trim() || colorIndex === null) return;

    setCargando(true);
    setProducto(null);
    Keyboard.dismiss();

    try {
      const data = await escanearSKU(sku.trim(), colorIndex);
      inputRef.current?.clear();
      inputRef.current?.focus();

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
    setProducto(null);
    inputRef.current?.clear();
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#0071ce" />
        <Text style={styles.textoRegresar}>Regresar</Text>
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

      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.inputVisible}
          placeholder="Escanea un SKU"
          onChangeText={(text) => {
            inputRef.current?.focus();
            if (text.length >= 6) {
              setProducto(null);
              buscarProductoAuto(text);
            }
          }}
          autoFocus
          showSoftInputOnFocus={false}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.botonClearInput} onPress={limpiar}>
          <Text style={styles.textoClearInput}>Borrar</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  textoRegresar: {
    fontSize: 16,
    color: '#0071ce',
    fontWeight: '600',
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  botonClearInput: {
    marginLeft: 10,
    backgroundColor: '#0071ce',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoClearInput: {
    fontSize: 16,
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
});
