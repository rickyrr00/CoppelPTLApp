import AsyncStorage from '@react-native-async-storage/async-storage';

export const coloresDisponibles = [
  '#FF3B30', // red
  '#34C759', // green
  '#007AFF', // blue
  '#FF9500', // orange
  '#5AC8FA', // light blue
  '#AF52DE', // purple
];

export const mapaColores: { [key: string]: number } = {
  '#FF3B30': 0, // red
  '#34C759': 1, // green
  '#007AFF': 2, // blue
  '#FF9500': 3, // orange
  '#5AC8FA': 4, // light blue
  '#AF52DE': 5, // purple
};

export const limpiarColorAsignado = async () => {
  try {
    const color = await AsyncStorage.getItem('colorAsignado');

    if (color) {
      // Borra color e índice
      await AsyncStorage.multiRemove(['colorAsignado', 'colorIndex']);

      // Revisa y actualiza colores ocupados
      const ocupados = await AsyncStorage.getItem('coloresOcupados');
      if (ocupados) {
        const lista = JSON.parse(ocupados);
        if (Array.isArray(lista)) {
          const nuevaLista = lista.filter((c: string) => c !== color);
          await AsyncStorage.setItem('coloresOcupados', JSON.stringify(nuevaLista));
        }
      }
    }
  } catch (error) {
    console.error('Error al liberar color asignado:', error);
  }
};
