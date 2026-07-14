const BASE_URL = "http://localhost:3000";

// Funzione per effettuare richieste HTTP al server
async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return null;
  return res.json();
}

// Funzione per ottenere e formattare gli errori della risposta del server
async function parseError(res) {
  const body = await res.json();
  const details = body.details?.map((detail) => detail.message).join(", ");
  const error = new Error(details || body.error);
  error.details = body.details;
  return error;
}

// Funzione per ottenere tutti gli ordini
export function getOrders() {
  return request("/orders");
}

// Funzione per la creazione di un nuovo ordine
export function createOrder(data) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Funzione per aggiornare un ordine esistente
export function updateOrder(id, data) {
  return request(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Funzione per eliminare un ordine
export function deleteOrder(id) {
  return request(`/orders/${id}`, { method: "DELETE" });
}
