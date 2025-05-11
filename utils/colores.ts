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

import AsyncStorage from '@react-native-async-storage/async-storage';

export const limpiarColorAsignado = async () => {
  const color = await AsyncStorage.getItem('colorAsignado');

  if (color) {
    await AsyncStorage.removeItem('colorAsignado');
    await AsyncStorage.removeItem('colorIndex');

    const ocupados = await AsyncStorage.getItem('coloresOcupados');
    if (ocupados) {
      const lista = JSON.parse(ocupados);
      const nuevaLista = lista.filter((c: string) => c !== color);
      await AsyncStorage.setItem('coloresOcupados', JSON.stringify(nuevaLista));
    }
  }
};
