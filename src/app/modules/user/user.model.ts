import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'You must have your first name.'],
  },
  lastName: {
    type: String,
    required: [true, 'You must have your last name.'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required.'],
  },
  country: {
    type: String,
    required: [true, 'country is required.'],
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
    required: [true, 'You must have a user name.'],
  },
  password: {
    type: String,
    required: [true, 'You must have a password.'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'You must have your full name'],
  },
  age: {
    type: Number,
    required: [true, 'You must have an age.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'You must have an email.'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'You must have your hobby.'],
  },
  address: {
    type: addressSchema,
    required: [true, 'You must have your address'],
  },
  orders: {
    type: [
      {
        productName: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    default: undefined,
    _id: false,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('user', userSchema);
