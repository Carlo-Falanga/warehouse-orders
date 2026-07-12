const BASE_URL = "http://localhost:3000";

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return null;
  return res.json();
}

async function parseError(res) {
  const body = await res.json();
  const error = new Error(body.error);
  error.detail = body.detail;
  return error;
}

export function getOrders() {
  return request("/orders");
}

export function createOrder(data) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateOrder(id, data) {
  return request(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteOrder(id) {
  return request(`/orders/${id}`, { method: "DELETE" });
}
