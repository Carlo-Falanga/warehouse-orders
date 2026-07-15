import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createOrderSchema, updateOrderSchema } from '../schemas/order.schema.js';

const router = Router();

// Definizione delle rotte per le operazioni CRUD
router.get('/', ordersController.getAllOrders);
router.post('/', validate(createOrderSchema), ordersController.createOrder);

router.get('/:id', ordersController.getOrderById);
router.put('/:id', validate(updateOrderSchema), ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

export default router