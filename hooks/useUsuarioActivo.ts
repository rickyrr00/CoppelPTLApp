import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export const useUsuarioActivo = () => {
  const [usuario, setUsuario] = useState<any>(null);

  const cargarUsuario = async () => {
    try {
      const datos = await AsyncStorage.getItem('usuarioLogueado');
      if (datos) {
        const json = JSON.parse(datos);
        setUsuario(json?.data?.user || json.user || null);
      }
    } catch (error) {
      console.error('Error cargando usuario activo:', error);
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarUsuario();
    }, [])
  );

  return usuario;
};
