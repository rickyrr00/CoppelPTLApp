// utils/colores.ts

// Variables internas (no exportadas directamente)
let _colorAsignadoGlobal: string | null = null;
export const coloresOcupadosGlobal: string[] = [];

// Lista de colores disponibles
export const coloresDisponibles = [
  '#FF5733', // rojo naranja
  '#33FF57', // verde
  '#3357FF', // azul
  '#FF33A8', // rosa fuerte
  '#33FFF5', // aqua
  '#F5FF33', // amarillo
  '#FF8C33', // naranja
  '#8C33FF', // morado
  '#33FF8C', // verde menta
  '#FF3333', // rojo fuerte
];

// ✅ Getter para saber qué color tengo
export const getColorAsignado = () => _colorAsignadoGlobal;

// ✅ Setter para asignar un nuevo color
export const setColorAsignado = (color: string) => {
  _colorAsignadoGlobal = color;
};

// ✅ Limpiar color cuando cierro sesión
export const limpiarColorAsignado = () => {
  if (_colorAsignadoGlobal) {
    const index = coloresOcupadosGlobal.indexOf(_colorAsignadoGlobal);
    if (index !== -1) {
      coloresOcupadosGlobal.splice(index, 1); // ❌ Libera el color ocupado
    }
    _colorAsignadoGlobal = null; // 🚮 Borra el color asignado
  }
};
