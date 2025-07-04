import axios from 'axios';

const API_BASE_URL = 'https://server-zzcb.onrender.com';

export const escanearSKU = async (sku: string, colorIndex: number | null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/scan-item`, {
      sku,
      color_index: colorIndex, // ← snake_case como lo pide el backend
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error en escaneo:', error.response?.data || error.message);
    throw error;
  }
};

export const confirmarCubby = async (cubbyId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/confirm-placement`, {
      cubby_id: cubbyId,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error confirmando cubby:', error.response?.data || error.message);
    throw error;
  }
};
