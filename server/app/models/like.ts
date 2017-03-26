import mongoose from 'mongoose';
import { APIError, LikeError } from '../error';

export interface LikeDocument {
  _id?: any;
  createBy: string;
  entityId: string;
};

const likeSchema = new mongoose.Schema({
  createBy: {
    type: String,
    required: true,
  },
  entityId: {
    type: String,
    index: true,
    required: true,
  },
});

type MongoLikeDocument = LikeDocument & mongoose.Document;

const likeModel = mongoose.model<MongoLikeDocument>('Like', likeSchema, 'Like');

const likeForEntity = async (entityId: string, createBy: string): Promise<void> => {
  if (!entityId) throw new APIError(LikeError.needEntityId);
  if (!createBy) throw new APIError(LikeError.needCreateBy);
  await likeModel.findOneAndUpdate({ entityId, createBy }, { entityId, createBy }, { upsert: true }).exec();
}

const unlikeForEntity = async (entityId: string, createBy: string): Promise<void> => {
  if (!entityId) throw new APIError(LikeError.needEntityId);
  if (!createBy) throw new APIError(LikeError.needCreateBy);
  await likeModel.findOneAndRemove({ entityId, createBy }).exec();
}

const calcEntityLikeCount = async (entityId: string): Promise<number> => {
  if (!entityId) throw new APIError(LikeError.needEntityId);
  return await likeModel.count({ entityId }).exec();
};

export const LikeModel = Object.assign(likeModel, {
  countOfEntity: calcEntityLikeCount, like: likeForEntity, unlike: unlikeForEntity
});
