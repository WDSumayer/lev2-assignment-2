import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodparseData = userValidationSchema.parse(userData);

    const result = await userServices.createUser(zodparseData);
    res.status(201).json({
      success: 'true',
      message: 'User Created Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Something went wrong.',
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: 'true',
      message: 'User Loaded Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      seccess: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userServices.getSingleUser(id);
    res.status(200).json({
      success: 'true',
      message: 'Single User Loaded Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.userId;

    const result = await userServices.updateUser(id, userData);
    res.status(200).json({
      success: 'true',
      message: 'User Updated Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      seccess: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    await userServices.deleteUser(id);
    res.status(200).json({
      success: 'true',
      message: 'User Deleted Successfully.',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.userId;

    const result = await userServices.createOrders(id, userData);
    res.status(200).json({
      success: 'true',
      message: 'Order created Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      seccess: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSpecificUserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getSpecificUserOrders(id);
    res.status(200).json({
      success: 'true',
      message: "Single User's orders loaded Successfully.",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getSpecificUserOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getSpecificUserOrdersTotalPrice(id);
    res.status(200).json({
      success: 'true',
      message: 'Total price calculated successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrders,
  getSpecificUserOrders,
  getSpecificUserOrdersTotalPrice,
};
