import * as ordersRepository from "../repositories/orders.repository.js";

// Funzione per validare e convertire l'id in un numero intero positivo
function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Funzioni per gestire le richieste HTTP
export function getAllOrders(req, res) {
  const orders = ordersRepository.findAll();
  res.json(orders);
}

export function getOrderById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res
      .status(400)
      .json({ error: 'Invalid id: must be positive integer' });
  }

  const order = ordersRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: `Order ${id} not found` });
  }

  res.json(order);
}

export function createOrder(req, res) {
  const created = ordersRepository.create(req.body);

  res.status(201).json(created);
}

export function updateOrder(req, res) {
    const id = parseId(req.params.id);
    if (id === null){
        return res.status(400).json({ error: 'Invalid id: must be positive integer' });
    }

    const updated = ordersRepository.update(id, req.body);
    if (!updated){
        return res.status(404).json({ error: `Order ${id} not found` });
    }

    res.json(updated);
}

export function deleteOrder(req, res){
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid id: must be positive integer' });
    }

    const deleted = ordersRepository.remove(id);
    if (!deleted){
        return res.status(404).json({ error: `order ${id} not found` });
    }

    res.status(204).end();
}
