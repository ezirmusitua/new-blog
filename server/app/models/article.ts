import mongoose from 'mongoose';
import { APIError, ArticleError, MongoError } from '../error';
import { Utils } from '../utils/index';
import { _listImmutableDocs, FindOptions, Callback } from './basic-methods';

const ViewCategory = {
  DRAFT: 100,
  PUBLISHED: 200,
}

export interface CatalogItem {
  content: string;
  category: number;
  progress: number;
}

export interface ArticleDocument {
  title: string;
  updateAt: number;
  description: string;
  content: string;
  catalog: CatalogItem[]
  tags: { label: string }[];
  images: { label: string, url: string }[];
  coverUrl?: string;
  viewCategory: number;
  belongToLabel: string;
  createBy: string;
  likeCount?: number;
  commentCount?: number;
}

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: true,
  },
  updateAt: {
    type: Number,
    index: true,
  },
  description: String,
  content: {
    type: String,
    required: true,
  },
  catalog: {
    type: {
      content: String,
      category: Number,
      progress: Number,
    },
    default: [],
  },
  tags: {
    type: [{
      label: String,
    }],
    default: [],
    index: true,
  },
  images: [{ label: String, url: String }],
  coverUrl: String,
  viewCategory: {
    type: Number,
    index: true,
    default: ViewCategory.DRAFT,
  },
  belongToLabel: {
    type: String,
    index: true,
  },
  createBy: String,
});

type MongoArticleDocument = ArticleDocument & mongoose.Document;

const articleModel = mongoose.model<MongoArticleDocument>('Article', articleSchema, 'Article');

const constructBody = (_id: string, body: any, createBy?: string): ArticleDocument => {
  const articleBody = {} as ArticleDocument;
  if (!body.title) {
    throw new APIError(ArticleError.needTitle);
  }
  articleBody.title = body.title.trim();
  articleBody.content = body.content.trim();
  articleBody.updateAt = Date.now();
  articleBody.tags = [];
  if (typeof body.tags === 'string') {
    articleBody.tags = body.tags.split('#').splice(1);
  }
  if (Array.isArray(body.tags)) {
    articleBody.tags = body.tags.map(tag => ({ label: tag.label && tag.label.trim() })).filter(tag => !!tag.label);
  }
  if (Array.isArray(body.images)) {
    articleBody.images = body.images.map(image => ({
      label: image.label && image.label.trim(),
      url: image.url && image.url.trim(),
    })).filter(image => !!image.label);
  }
  articleBody.belongToLabel = body.belongToLabel || '未分类';
  articleBody.coverUrl = (body.coverUrl && body.coverUrl.trim()) || '';
  articleBody.catalog = Utils.generateCatalog(articleBody.content);
  articleBody.createBy = createBy || 'no-name';
  articleBody.viewCategory = parseInt(body.viewCategory, 10);
  return articleBody;
}

const createNew = async (createBy: string, body: any) => {
  return await articleModel.create(constructBody(null, body, createBy));
}

const updateOldById = async (_id: string, body: any) => {
  return await articleModel.findOneAndUpdate({ _id }, { $set: constructBody(_id, body) }, { new: true }).exec();
}

const listImmutableDocs = async (condition?: Object, projection?: Object, options?: FindOptions, callback?: Callback,
  execCallback?: Callback) => {
  return await _listImmutableDocs<ArticleDocument>(articleModel, condition, projection, options, callback,
    execCallback);
}

const findImmutableOne = async (condition: Object, projection?: Object, callback?: Callback,
  execCallback?: Callback): Promise<ArticleDocument> => {
  const docs = await listImmutableDocs(condition, projection, { limit: 1 }, callback, execCallback);
  return ((docs && docs.length) ? docs[0] : null) as ArticleDocument;
}

const findImmutableById = async (_id: string, projection?: Object, callback?: Callback,
  execCallback?: Callback): Promise<ArticleDocument> => {
  const doc = await findImmutableOne({ _id }, projection, callback, execCallback);
  if (!doc) throw new APIError(MongoError.notFound);
  return doc;
}

export const ArticleModel = Object.assign(articleModel, {
  Enum: { ViewCategory, },
  list: listImmutableDocs,
  fetch: findImmutableOne,
  fetchById: findImmutableById,
  createNew,
  updateOldById,
});
