import { Schema, Document, model } from 'mongoose';
import { Utils } from '../utils/index';
import { UserDocument } from './user';

export interface SessionDocument {
  _id?: any;
  userId: string;
  token: string;
  clientCategory: number;
  updateAt: number;
  role: number;
}

const sessionSchema = new Schema({
  userId: {
    type: String,
    index: true,
  },
  token: {
    type: String,
    index: true,
  },
  clientCategory: Number,
  updateAt: Number,
  role: Number,
});

type MongoSessionDocument = SessionDocument & Document;

const sessionModel = model<MongoSessionDocument>('Session', sessionSchema, 'Session');

const findOneByUserId = async (userId: string): Promise<SessionDocument | undefined> => {
  if (!userId) return undefined;
  const sessions = await sessionModel.find({ userId, updateAt: { $gt: Date.now() - 24 * 60 * 60 * 1000 } })
    .limit(1).lean().exec() as SessionDocument[];
  return sessions.length ? sessions[0] : undefined;
};

const updateOrCreateSession = async (user: UserDocument): Promise<SessionDocument | undefined> => {
  if (!user) return undefined;
  const clientCategory = 100;
  const token = Utils.generateRandomBytes();
  const sessionBody = {
    userId: user._id.toString(),
    token,
    clientCategory,
    updateAt: Date.now(),
    role: user.role
  } as SessionDocument;
  const session = await sessionModel.findOneAndUpdate(
    { userId: user._id.toString() }, sessionBody,
    { upsert: true, setDefaultsOnInsert: true, new: true },
  );
  return session;
};

const activateSession = async (token: string, userId: string): Promise<MongoSessionDocument | undefined> => {
  if (!userId || !token) return undefined;
  const now = Date.now();
  const sessions = await sessionModel.find({ userId, token })
    .limit(1).exec() as MongoSessionDocument[];
  if (!sessions || !sessions.length) return undefined;
  if (sessions[0].updateAt < now - 24 * 60 * 60 * 1000) return undefined;
  sessions[0].updateAt = now;
  return await sessions[0].save() as MongoSessionDocument;
};

const removeSession = async (token: string, userId: string): Promise<void> => {
  await sessionModel.remove({ userId, token }, (err) => console.log(err));
}

export const SessionModel = Object.assign(sessionModel, {
  findOneByUserId, updateOrCreateSession, activateSession, removeSession
});
