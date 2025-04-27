import requests

BASE_URL = "https://server-zzcb.onrender.com"

def listar_items_pendientes():
    try:
        response = requests.get(f"{BASE_URL}/items", timeout=15)
        response.raise_for_status()
        items = response.json()

        if not items:
            print("⚠️ No hay ítems registrados.")
            return

        print("\n📦 Ítems pendientes de escaneo:")
        for item in items:
            status = "✅ Escaneado" if item.get('scanned') else "❌ Pendiente"
            print(f"OrderID: {item.get('orderid')} | SKU: {item.get('sku')} | Estado: {status}")

    except requests.exceptions.Timeout:
        print("❌ Error: El servidor tardó demasiado en responder (timeout).")
    except Exception as e:
        print(f"❌ Error al obtener ítems: {e}")

if __name__ == "__main__":
    listar_items_pendientes()
