import mongoose from 'mongoose';

export interface SessionDocument {
  _id: any;
  userId: string;
  token: string;
  clientCategory: number;
  updateAt: number;
}

const sessionSchema = new mongoose.Schema({
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
  const sessions = await sessionModel.find({ userId })
    .limit(1).lean().exec() as SessionDocument[];
  return sessions.length ? sessions[0] : null;
};

const sessionModel = mongoose.model<MongoSessionDocument>('Session', sessionSchema, 'Session');

export const SessionModel = Object.assign(sessionModel, {findOneByUserId});

