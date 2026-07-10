import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller.js';

const router = Router();

router.get('/', ordersController.getAllOrders);
router.post('/', ordersController.createOrder);

router.get('/id', ordersController.getOrderById);
router.put('/id', ordersController.updateOrder);
router.delete('/id', ordersController.deleteOrder);

export default router