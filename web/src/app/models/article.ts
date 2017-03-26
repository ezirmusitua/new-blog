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
  images?: string[];
  constructor(body?: any) {
    this._id = body ? body._id.toString() : '';
    this.title = body ? body.title : '';
    if (body && body.updateAt) {
      this.updateAt = body.updateAt
    }
    this.content = body ? body.htmlContent : '';
    this.description = body ? body.description : '';
    this.catalog = [];
    if (body && body.catalog && body.catalog.length) {
      this.catalog = body.catalog.map(catalogItem => ({
        content: catalogItem.content ? catalogItem.content.trim() : '',
        category: parseInt(catalogItem.category, 10),
        progress: Math.ceil(catalogItem.progress * 100),
      })).filter(item => !!item);
    }
    this.coverUrl = body.coverUrl && body.coverUrl.trim();
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
    console.log(this);
  }
}
