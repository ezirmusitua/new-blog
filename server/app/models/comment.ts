import mongoose from 'mongoose';
import { _listImmutableDocs } from './basic-methods';
import { APIError, CommentError } from '../error';

export interface CommentDocument {
  _id?: any;
  createBy: string;
  replyTo?: string;
  entityId: string;
  content: string;
};

const commentSchema = new mongoose.Schema({
  createBy: {
    type: String,
    required: true,
  },
  replyTo: String,
  entityId: {
    type: String,
    index: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

type MongoCommentDocument = CommentDocument & mongoose.Document;

const commentModel = mongoose.model<MongoCommentDocument>('Comment', commentSchema, 'Comment');

const constructBody = (body: any): CommentDocument => {
  const doc = {} as CommentDocument;
  if (!doc.entityId) throw new APIError(CommentError.needEntityId);
  doc.entityId = body.entityId.trim();
  if (!body.content) throw new APIError(CommentError.needContent);
  doc.entityId = body.content.trim();
  if (!body.createBy) throw new APIError(CommentError.needCreateBy);
  doc.createBy = body.createBy.trim();
  doc.replyTo = body.replyTo ? body.replyTo.trim() : null;
  return doc;
}

const postCommentForEntity = async (body: CommentDocument): Promise<void> => {
  await commentModel.findOneAndUpdate({ entityId: body.entityId }, constructBody(body), { upsert: true }).exec();
}

const listEntityComment = async (entityId: string): Promise<CommentDocument[]> => {
  return await _listImmutableDocs(commentModel, { entityId }, {}, { sort: { _id: -1 } }) as CommentDocument[];

};

const calcEntityCommentCount = async (entityId: string): Promise<number> => {
  return await commentModel.count({ entityId }).exec();
};

export const CommentModel = Object.assign(commentModel, {
  countOfEntity: calcEntityCommentCount, listForEntity: listEntityComment, post: postCommentForEntity
});
