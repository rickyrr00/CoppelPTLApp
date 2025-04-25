const API_BASE = "https://server-zzcb.onrender.com";

export const obtenerItems = async () => {
  try {
    const res = await fetch(`${API_BASE}/items`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error al obtener items:", err);
    return [];
  }
};

export const registrarEscaneo = async (itemId: string, orderId: string, operatorId: string, cubbyId: string) => {
  try {
    const res = await fetch(`${API_BASE}/scan-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itemId,
        orderId,
        operatorId,
        cubbyId
      })
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Error al registrar escaneo:", err);
    return null;
  }
};
