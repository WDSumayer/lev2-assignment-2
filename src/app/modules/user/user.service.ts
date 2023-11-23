import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser): Promise<TUser> => {
  const result = await User.create(userData);
  return result;
};

const getAllUsers = async (): Promise<TUser[]> => {
  const result = await User.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUser = async (id: string): Promise<TUser | null> => {
  const userExists = await User.isUserExists(id);

  if (userExists === null) {
    throw new Error('User not found.');
  }
  const result = await User.findOne({ userId: id });
  return result;

  //   const result = await User.findOne({ userId: id });
  //   return result;
};

const updateUser = async (
  id: string,
  userData: TUser,
): Promise<TUser | null> => {
  const userExists = await User.isUserExists(id);

  if (userExists === null) {
    throw new Error('User not found.');
  }
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    $set: userData,
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<TUser | null> => {
  const userExists = await User.isUserExists(id);

  if (userExists === null) {
    throw new Error('User not found.');
  }
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
