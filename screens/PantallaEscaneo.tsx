import React, { useState, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '../hooks/useNetInfo';
import { getColorAsignado } from '../utils/colores'; // ✅ Importar bien

const PantallaEscaneo = ({ navigation }: any) => {
  const [skuInput, setSkuInput] = useState('');
  const [producto, setProducto] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const isConnected = useNetInfo();

  const buscarProducto = async () => {
    if (!getColorAsignado()) { // ✅ Validar que haya color asignado
      Toast.show({
        type: 'error',
        text1: 'Color no asignado',
        text2: 'Debes asignarte un color antes de escanear.',
        position: 'bottom',
      });
      return;
    }

    if (!skuInput.trim()) return;

    Keyboard.dismiss();
    setCargando(true);
    setProducto(null);

    // Aquí iría tu lógica real de búsqueda (mock por ahora)
    setTimeout(() => {
      setProducto({
        sku: skuInput,
        coordenada: 'Módulo A1 - Estante 3',
        articulo: 'Playera Deportiva',
        orden: 'ORD-12345',
        detalle: 'Playera talla M color azul',
      });
      setCargando(false);
    }, 1500);
  };

  const limpiar = () => {
    setSkuInput('');
    setProducto(null);
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escaneo de Producto</Text>

      {!isConnected && (
        <View style={styles.bannerOffline}>
          <Text style={styles.textoOffline}>Estás sin conexión</Text>
        </View>
      )}

      <TextInput
        ref={inputRef}
        style={styles.inputVisible}
        placeholder="Escribe el SKU"
        onChangeText={setSkuInput}
        value={skuInput}
      />

      <TouchableOpacity style={styles.botonBuscar} onPress={buscarProducto}>
        <Text style={styles.textoBuscar}>Buscar</Text>
      </TouchableOpacity>

      <View style={styles.resultadoContainer}>
        {cargando ? (
          <ActivityIndicator size="large" color="#0071ce" />
        ) : producto ? (
          <>
            <Text style={styles.resultadoTexto}>🔎 Resultado del escaneo:</Text>
            <Text style={styles.linea}>SKU: {producto.sku}</Text>
            <Text style={styles.linea}>Coordenada: {producto.coordenada}</Text>
            <Text style={styles.linea}>Artículo: {producto.articulo}</Text>
            <Text style={styles.linea}>Orden: {producto.orden}</Text>
            <Text style={styles.linea}>Detalle: {producto.detalle}</Text>

            <TouchableOpacity style={styles.botonClear} onPress={limpiar}>
              <Text style={styles.textoClear}>Borrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.resultadoTexto}>Escanea un código o escribe el SKU</Text>
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
