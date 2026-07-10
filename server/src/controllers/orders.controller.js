import * as ordersRepository from "../repositories/orders.repository";

function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function getAllOrders(req, res) {
  const orders = ordersRepository.findAll();
  res.json(orders);
}

export function getOrderById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res
      .status(400)
      .json({ error: "Invalid id: must be positive integer" });
  }

  const order = ordersRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: `Order ${id} not found` });
  }

  res.json(order);
}


