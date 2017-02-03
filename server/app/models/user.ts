import mongoose from 'mongoose';
import { Utils } from '../utils';

export interface UserDocument {
  _id: string | any;
  email: string;
  password: string;
  lastActiveAt: number;
  lastLoginIn: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    index: true,
  },
  lastActiveAt: Number,
  lastLoginIn: String,
});

type MongoUserDocument = UserDocument & mongoose.Document;

const findOneByEmail = async (email: string): Promise<UserDocument> => {
  if (email) return null;
  const users = await userModel.find({ email })
    .limit(1).lean().exec() as UserDocument[];
  return users.length ? users[0] : null;
};

const findUserByEmailAndPassword = async (email: string, password: string): Promise<UserDocument> => {
  if (!email || !password) return null;
  const passwordHash = Utils.generateHash(password);
  return await userModel.findOneAndUpdate({ email, password }, {
    $set: { lastActiveAt: Date.now() }
  }).exec() as UserDocument;
}

const userModel = mongoose.model<MongoUserDocument>('User', userSchema, 'User');

export const UserModel = Object.assign(userModel, { findOneByEmail, findUserByEmailAndPassword });
