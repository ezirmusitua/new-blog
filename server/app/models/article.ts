import mongoose from 'mongoose';
import { APIError, ArticleError, MongoError } from '../error';
import { Utils } from '../utils/index';
import { _listImmutableDocs, FindOptions, Callback } from './basic-methods';

const ViewCategory = {
  DRAFT: 100,
  PREVIEW: 200,
  PUBLISHED: 300,
}

export interface CatalogItem {
  content: string;
  category: number;
  progress: number;
}

export interface ArticleDocument {
  title: string;
  updateAt: number;
  markdownContent: string;
  htmlContent: string;
  catalog: CatalogItem[]
  tags: { label: string }[];
  viewCategory: number;
  createBy: string;
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
  markdownContent: {
    type: String,
    required: true,
  },
  htmlContent: {
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
  viewCategory: {
    type: Number,
    index: true,
    default: ViewCategory.PREVIEW,
  },
  createBy: String,
});

type MongoArticleDocument = ArticleDocument & mongoose.Document;

const constructBody = (_id: string, body: any, createBy?: string): ArticleDocument => {
  const articleBody = {} as ArticleDocument;
  if (!body.title) {
    throw new APIError(ArticleError.needTitle);
  }
  articleBody.title = body.title.trim();
  if (!body.htmlContent || !body.markdownContent) {
    throw new APIError(ArticleError.needContent);
  }
  articleBody.htmlContent = body.htmlContent.trim();
  articleBody.markdownContent = body.markdownContent.trim();
  articleBody.updateAt = Date.now();
  articleBody.tags = [];
  if (typeof body.tags === 'string') {
    articleBody.tags = body.tags.split('#').splice(1);
  }
  if (Array.isArray(body.tags)) {
    articleBody.tags = body.tags.map(tag => ({ label: tag.label && tag.label.trim() })).filter(tag => !!tag.label);
  }
  articleBody.catalog = Utils.generateCatalog(articleBody.markdownContent);
  articleBody.createBy = 'no-name';
  articleBody.viewCategory = parseInt(body.viewCategory, 10);
  articleBody.createBy = createBy;
  return articleBody;
}

const createNew = async (createBy: string, body: any) => {
  return await articleModel.create(constructBody(null, body, createBy));
}

const updateOldById = async (_id: string, body: any) => {
  return await articleModel.findOneAndUpdate({ _id }, { $set: constructBody(_id, body) }, { new: true }).exec();
}

const listImmutableDocs = async (condition?: Object, projection?: Object, options?: FindOptions, callback?: Callback, execCallback?: Callback) => {
  return await _listImmutableDocs<ArticleDocument>(articleModel, condition, projection, options, callback, execCallback);
}

const findImmutableOne = async (condition: Object, projection?: Object, callback?: Callback, execCallback?: Callback): Promise<ArticleDocument> => {
  const docs = await listImmutableDocs(condition, projection, { limit: 1 }, callback, execCallback);
  return ((docs && docs.length) ? docs[0] : null) as ArticleDocument;
}

const findImmutableById = async (_id: string, projection?: Object, callback?: Callback, execCallback?: Callback): Promise<ArticleDocument> => {
  const doc = await findImmutableOne({ _id }, projection, callback, execCallback);
  if (!doc) throw new APIError(MongoError.notFound);
  return doc;
}

const articleModel = mongoose.model<MongoArticleDocument>('Article', articleSchema, 'Article');

export const ArticleModel = Object.assign(articleModel, {
  list: listImmutableDocs,
  fetch: findImmutableOne,
  fetchById: findImmutableById,
  createNew,
  updateOldById,
});
