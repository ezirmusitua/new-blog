import mongoose from 'mongoose';
import { APIError } from '../error';

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
    index: true
  },
  updateAt: Date,
  markdownContent: String,
  htmlContent: String,
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

const isLineEnd = (markdownContent: string, currentIndex: number): boolean => {
  const currentAndNext = markdownContent.slice(currentIndex, 2);
  return currentAndNext === '  ' || currentAndNext === '/n/n';
}

const createCategoryItem = (markdownContent: string, currentIndex: number): [CatalogItem, number] => {
  const catalogItem = {} as CatalogItem;
  let hashTagCount = 1;
  let index = currentIndex + 1;
  console.log(markdownContent.charAt(index) === ' ');
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
  let content = '';
  while (isLineEnd(markdownContent, index)) {
    content += markdownContent.charAt(index);
    index += 1;
  }
  index += 2;
  return [catalogItem, index];
}

const crossImageAndLink = (markdownContent: string, currentIndex: number): number => {
  while (markdownContent.charAt(currentIndex + 1) !== ')') {
    currentIndex += 1;
  }
  return currentIndex + 1;
}

const generateCatalog = (markdownContent: string): CatalogItem[] => {
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
    }
  }
  console.log(catalog);
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
  if (!body.htmlContent || body.markdownContent) {
    throw new APIError({ id: 1001, status: 400, message: 'article must have content' });
  }
  articleBody.htmlContent = body.htmlContent.trim();
  articleBody.markdownContent = body.markdownContent.trim();
  articleBody.updateAt = Date.now();
  if (!createBy) {
    throw new APIError({ id: 1002, status: 400, message: 'article must have author' });
  }
  articleBody.tags = [];
  if (typeof body.tags === 'string') {
    articleBody.tags = body.tags.split('#').splice(1);
  }
  if (Array.isArray(body.tags)) {
    articleBody.tags = body.tags.map(tag => ({ label: tag.label && tag.label.trim() })).filter(tag => !!tag.label);
  }
  articleBody.catalog = generateCatalog(articleBody.markdownContent);
  if (_id) {
    articleBody.viewCategory = parseInt(body.viewCategory, 10);
  } else {
    articleBody.createBy = createBy;
  }
  return articleBody;
}

const create = async (createBy: string, body: any) => {
  await articleModel.create(constructBody(null, body, createBy));
}

const update = async (_id: string, body: any) => {
  await articleModel.update({ _id }, { $set: constructBody(_id, body) });
}

const articleModel = mongoose.model<MongoArticleDocument>('Article', articleSchema, 'Article');

export const ArticleModel = Object.assign(articleModel, { generateCatalog, create, update });
