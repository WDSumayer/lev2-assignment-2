import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);

router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getSingleUser);
router.get('/:userId/orders', userControllers.getSpecificUserOrders);
router.get(
  '/:userId/orders/total-price',
  userControllers.getSpecificUserOrdersTotalPrice,
);
router.put('/:userId', userControllers.updateUser);
router.put('/:userId/orders', userControllers.createOrders);
router.delete('/:userId', userControllers.deleteUser);

export const userRoutes = router;
