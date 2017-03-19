import mongoose from 'mongoose';
import { Utils } from '../utils/index';

export interface SessionDocument {
  _id: any;
  email: string;
  userId: string;
  token: string;
  clientCategory: number;
  updateAt: number;
}

const sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
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
});

type MongoSessionDocument = SessionDocument & mongoose.Document;

const findOneByUserId = async (userId: string): Promise<SessionDocument> => {
  if (!userId) return null;
  const sessions = await sessionModel.find({ userId, updateAt: { $gt: Date.now() - 24 * 60 * 60 * 1000 } })
    .limit(1).lean().exec() as SessionDocument[];
  return sessions.length ? sessions[0] : null;
};

const updateOrCreateSession = async (userId: string): Promise<SessionDocument> => {
  if (!userId) return null;
  const clientCategory = 100;
  const token = Utils.generateRandomBytes();
  const sessionBody = {
    userId, token, clientCategory, updateAt: Date.now()
  } as SessionDocument;
  const session = await sessionModel.findOneAndUpdate(
    { userId }, sessionBody,
    { upsert: true, setDefaultsOnInsert: true, new: true },
  );
  return session;
};

const activateSession = async (token: string, userId: string): Promise<MongoSessionDocument> => {
  if (!userId || !token) return null;
  const now = Date.now();
  const sessions = await sessionModel.find({ userId, token })
    .limit(1).exec() as MongoSessionDocument[];
  if (!sessions || !sessions.length) return;
  if (sessions[0].updateAt < now - 24 * 60 * 60 * 1000) return;
  sessions[0].updateAt = now;
  return await sessions[0].save() as MongoSessionDocument;
};

const removeSession = async (token: string, userId: string): Promise<void> => {
  await sessionModel.remove({ userId, token });
}

const sessionModel = mongoose.model<MongoSessionDocument>('Session', sessionSchema, 'Session');

export const SessionModel = Object.assign(sessionModel, {
  findOneByUserId, updateOrCreateSession, activateSession, removeSession
});
