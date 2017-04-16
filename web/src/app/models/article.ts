export class Article {
  _id?: string;
  title: string;
  updateAt?: number;
  content: string;
  description: string;
  catalog: {
    content: string;
    category: number;
    progress: number;
  }[];
  tags: { label: string }[];
  viewCategory: number;
  createBy: any;
  coverUrl?: string;
  images?: { label: string, url: string }[];
  belongToLabel?: string;
  likeCount?: number;
  commentCount?: number;
  constructor(body?: any) {
    this._id = body._id ? body._id : '';
    this.title = body.title ? body.title : '';
    if (body && body.updateAt) {
      this.updateAt = body.updateAt
    }
    this.content = body ? body.content : '';
    this.description = body ? body.description : '';
    this.catalog = [];
    if (body && body.catalog && body.catalog.length) {
      this.catalog = body.catalog.map(catalogItem => ({
        content: catalogItem.content ? catalogItem.content.trim() : '',
        category: parseInt(catalogItem.category, 10),
        progress: Math.ceil(catalogItem.progress * 100),
      })).filter(item => !!item);
    }
    this.coverUrl = body && body.coverUrl && body.coverUrl.trim();
    this.tags = [];
    if (body && body.tags && body.tags.length) {
      this.tags = body.tags.map(tag => tag.label.trim()).filter((tag) => !!tag.label);
    }
    this.images = [];
    if (body && body.images && body.images.length) {
      this.images = body.images.map(image => {
        return {
          url: image.url.trim(),
          label: image.label
        };
      }).filter((image) => !!image.url);
    }
    this.viewCategory = 100;
    if (body && body.viewCategory) {
      this.viewCategory = parseInt(body.viewCategory, 10);
    }
    this.createBy = body ? body.createBy : '';
    this.belongToLabel = body ? body.belongToLabel : '';
    this.commentCount = parseInt(body.commentCount, 10) || 0;
    this.likeCount = parseInt(body.likeCount, 10) || 0;
  }
  public static isValid(body: any): boolean {
    if (!body.title) return false;
    if (!body.content) return false;
    if (!body.description) return false;
    if (!body.coverUrl) return false;
    if (!body.viewCategory || [100, 200].indexOf(parseInt(body.viewCategory, 10)) < 0) return false;
    return true;
  }
  public static isInvalidNew(body: any): boolean {
    return !Article.isValid(body);
  }

  public static isInvalid(body: any): boolean {
    const invalidIdToSave = !body._id || body._id === 'new';
    return invalidIdToSave || !Article.isValid(body);
  }
}
