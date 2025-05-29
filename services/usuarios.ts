// services/usuarios.ts

export const API_URL = 'https://server-zzcb.onrender.com';

// Tipo de usuario para registro
export type Usuario = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  color_hex: string;
  color_index: number;
};

// Registrar usuario (POST /register-user)
export const registrarUsuario = async (usuario: Usuario) => {
  const response = await fetch(`${API_URL}/register-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Error al registrar usuario');
  }

  return data;
};

// Actualizar color (PATCH /update-color)
export const actualizarColor = async (
  username: string,
  color_hex: string,
  color_index: number
) => {
  const response = await fetch(`${API_URL}/update-color`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, color_hex, color_index }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Error al actualizar color');
  }

  return data;
};
