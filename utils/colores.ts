import AsyncStorage from '@react-native-async-storage/async-storage';

export const coloresDisponibles: string[] = [
  '#FF3B30', // red
  '#34C759', // green
  '#007AFF', // blue
  '#FFCC00', // yellow
  '#5AC8FA', // cyan
  '#AF52DE', // magenta
];

export const mapaColores: { [key: string]: number } = {
  '#FF3B30': 0, // red
  '#34C759': 1, // green
  '#007AFF': 2, // blue
  '#FFCC00': 3, // yellow
  '#5AC8FA': 4, // cyan
  '#AF52DE': 5, // magenta
};

export const limpiarColorAsignado = async () => {
  try {
    const color = await AsyncStorage.getItem('colorAsignado');
    if (!color) return;

    await AsyncStorage.multiRemove(['colorAsignado', 'colorIndex']);

    const ocupados = await AsyncStorage.getItem('coloresOcupados');
    if (ocupados) {
      const lista: string[] = JSON.parse(ocupados);
      const nuevaLista = lista.filter((c) => c !== color);
      await AsyncStorage.setItem('coloresOcupados', JSON.stringify(nuevaLista));
    }
  } catch (error) {
    console.error('❌ Error al liberar color asignado:', error);
  }
};
