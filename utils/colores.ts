import { supabase } from '../lib/supabase';

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
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const userId = authData?.user?.id;

    if (!userId || authError) {
      console.error('❌ No se pudo obtener el usuario para limpiar color');
      return;
    }

    const { error } = await supabase
      .from('usuarios')
      .update({
        color_hex: null,
        color_index: null,
      })
      .eq('id', userId);

    if (error) {
      console.error('❌ Error al limpiar color en Supabase:', error.message);
    }
  } catch (error) {
    console.error('❌ Error inesperado al liberar color asignado:', error);
  }
};
