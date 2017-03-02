import mongoose from 'mongoose';
import { APIError } from '../error';

type Callback = (err: any, res: any) => void

interface FindOptions {
  limit?: number;
  sort?: { [key: string]: number };
}

const CatalogCategory = {
  H1: 100,
  H2: 200,
  H3: 300,
  H4: 500,
  H5: 600,
}

const ViewCategory = {
  DRAFT: 100,
  PREVIEW: 200,
  PUBLISHED: 300,
}

interface CatalogItem {
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

const specialChar = {
  H: '#',
  I: '!',
  L: '['
}

export const calcLineEndSkip = (markdownContent: string, currentIndex: number): number => {
  const curChar = markdownContent[currentIndex];
  if (!curChar) return 999999;
  if (curChar === ' ' && markdownContent.charAt(currentIndex + 1) === ' ') {
    return 2;
  }
  if (curChar === '\n' && markdownContent.charAt(currentIndex + 1) === '\n') {
    return 2;
  }
  return 1;
}

export const createCategoryItem = (markdownContent: string, currentIndex: number): [CatalogItem, number] => {
  const catalogItem = {} as CatalogItem;
  let hashTagCount = 1;
  let index = currentIndex + 1;
  while (markdownContent.charAt(index) !== ' ') {
    if (markdownContent.charAt(index) === specialChar.H) {
      hashTagCount += 1;
    }
    index += 1;
  }
  index += 1;
  if (hashTagCount === 1) {
    catalogItem.category = CatalogCategory.H1;
  }
  if (hashTagCount === 2) {
    catalogItem.category = CatalogCategory.H2;
  }
  if (hashTagCount === 3) {
    catalogItem.category = CatalogCategory.H3;
  }
  if (hashTagCount === 4) {
    catalogItem.category = CatalogCategory.H4;
  }
  if (hashTagCount === 5) {
    catalogItem.category = CatalogCategory.H5;
  }
  let content = markdownContent.charAt(index);
  let skipCount = calcLineEndSkip(markdownContent, index);
  while (skipCount === 1 && index < markdownContent.length) {
    index += 1;
    content += markdownContent.charAt(index);
    skipCount = calcLineEndSkip(markdownContent, index);
  }
  index += skipCount;
  catalogItem.content;
  return [catalogItem, index];
}

export const crossImageAndLink = (markdownContent: string, currentIndex: number): number => {
  while (markdownContent.charAt(currentIndex + 1) !== ')' && currentIndex < markdownContent.length) {
    currentIndex += 1;
  }
  return currentIndex + 1;
}

export const generateCatalog = (markdownContent: string): CatalogItem[] => {
  const catalog = [];
  let effectiveLength = 0;
  const totalCharLength = markdownContent.length;
  let index = 0;
  while (index < totalCharLength) {
    if (markdownContent.charAt(index) === specialChar.H) {
      const [catalogItem, i] = createCategoryItem(markdownContent, index);
      index = i;
      catalog.push(Object.assign({ progress: effectiveLength }, catalogItem));
    } else if (markdownContent.charAt(index) === specialChar.I) {
      index = crossImageAndLink(markdownContent, index);
      effectiveLength += 100;
    } else if (markdownContent.charAt(index) === specialChar.L) {
      index = crossImageAndLink(markdownContent, index);
      effectiveLength += 50;
    } else {
      effectiveLength += 1;
      index += 1;
    };
  }
  return catalog.map(catalogItem => Object.assign({}, catalogItem, {
    progress: catalogItem.progress / effectiveLength,
  }));
}

const constructBody = (_id: string, body: any, createBy?: string): ArticleDocument => {
  const articleBody = {} as ArticleDocument;
  if (!body.title) {
    throw new APIError({ id: 1000, status: 400, message: 'article must have title' });
  }
  articleBody.title = body.title.trim();
  if (!body.htmlContent || !body.markdownContent) {
    throw new APIError({ id: 1001, status: 400, message: 'article must have content' });
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
  articleBody.catalog = generateCatalog(articleBody.markdownContent);
  articleBody.viewCategory = 100;
  articleBody.createBy = 'no-name';
  if (_id) {
    articleBody.viewCategory = parseInt(body.viewCategory, 10);
  } else {
    articleBody.createBy = createBy;
  }
  return articleBody;
}

const createNew = async (createBy: string, body: any) => {
  return await articleModel.create(constructBody(null, body, createBy));
}

const updateOldById = async (_id: string, body: any) => {
  return await articleModel.findOneAndUpdate({ _id }, { $set: constructBody(_id, body) }, { new: true }).exec();
}

const listImmutableDocs = async (condition?: Object, projection?: Object, options?: FindOptions, callback?: Callback, execCallback?: Callback): Promise<ArticleDocument[]> => {
  const {limit, sort} = options || { limit: null, sort: { _id: -1 } };
  return await articleModel.find(condition, projection, callback).limit(limit).sort(sort).lean(true).exec(execCallback) as ArticleDocument[];
}

const findImmutableOne = async (condition: Object, projection?: Object, callback?: Callback, execCallback?: Callback): Promise<ArticleDocument> => {
  const docs = await listImmutableDocs(condition, projection, { limit: 1 }, callback, execCallback);
  return ((docs && docs.length) ? docs[0] : null) as ArticleDocument;
}

const findImmutableById = async (_id: string, projection?: Object, callback?: Callback, execCallback?: Callback): Promise<ArticleDocument> => {
  return await findImmutableOne({ _id }, projection, callback, execCallback);
}

const articleModel = mongoose.model<MongoArticleDocument>('Article', articleSchema, 'Article');

export const ArticleModel = Object.assign(articleModel, {
  list: listImmutableDocs,
  fetch: findImmutableOne,
  fetchById: findImmutableById,
  generateCatalog,
  createNew,
  updateOldById,
});
