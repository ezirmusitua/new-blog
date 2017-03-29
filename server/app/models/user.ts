import mongoose from 'mongoose';
import { Utils } from '../utils/index';
import { APIError, MongoError } from '../error';

const RoleCategory = {
  ADMIN: 100,
  NORMAL: 500,
  VISITOR: 1000,
};

const StatusCategory = {
  ACTIVE: 100,
  INACTIVE: 200,
};

export interface UserDocument {
  _id: string | any;
  email: string;
  password: string;
  role: number;
  status: number;
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
  role: {
    type: Number,
    index: true,
    default: RoleCategory.NORMAL,
  },
  status: {
    type: Number,
    index: true,
    default: StatusCategory.INACTIVE,
  },
  lastActiveAt: Number,
  lastLoginIn: String,
});

type MongoUserDocument = UserDocument & mongoose.Document;

const userModel = mongoose.model<MongoUserDocument>('User', userSchema, 'User');

const findOneByEmail = async (email: string): Promise<UserDocument> => {
  if (email) return null;
  const users = await userModel.find({ email })
    .limit(1).lean().exec() as UserDocument[];
  return users.length ? users[0] : null;
};

const findUserByEmailAndPassword = async (email: string, password: string): Promise<UserDocument> => {
  if (!email || !password) return null;
  const passwordHash = Utils.generateHash(password);
  const user = await userModel.findOneAndUpdate({
    email, password: passwordHash, status: StatusCategory.ACTIVE
  }, { $set: { lastActiveAt: Date.now() } }, { new: true }).exec() as UserDocument;
  if (!user) throw new APIError(MongoError.notFound);
  return user;
}

export const UserModel = Object.assign(userModel, { Role: RoleCategory, findOneByEmail, findUserByEmailAndPassword });
