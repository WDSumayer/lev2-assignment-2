import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    String,
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'You must have a user id.'],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'You must have a password'],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
  },
  orders: {
    type: [ordersSchema],
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('user', userSchema);
