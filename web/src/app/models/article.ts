export class Article {
  _id?: string;
  title: string;
  updateAt?: number;
  markdownContent: string;
  htmlContent: string;
  catalog: {
    content: string;
    category: number;
    progress: number;
  }[];
  tags: { label: string }[];
  viewCategory: number;
  createBy: any;
  constructor(body?: any) {
    this._id = body ? body._id.toString() : '';
    this.title = body ? body.title : '';
    if (body && body.updateAt) {
      this.updateAt = body.updateAt
    }
    this.markdownContent = body ? body.markdownContent : '';
    this.htmlContent = body ? body.htmlContent : '';
    this.catalog = [];
    if (body && body.catalog && body.catalog.length) {
      this.catalog = body.catalog.map(catalogItem => ({
        content: catalogItem.content ? catalogItem.content.trim() : '',
        category: parseInt(catalogItem.category, 10),
        progress: parseInt(catalogItem.progress, 10),
      })).filter(item => !!item);
    }
    this.tags = [];
    if (body && body.tags && body.tags.length) {
      this.tags = body.tags.map(tag => tag.label.trim()).filter((tag) => !!tag.label);
    }
    this.viewCategory = 100;
    if (body && body.viewCategory) {
      this.viewCategory = parseInt(body.viewCategory, 10);
    }
    this.createBy = body ? body.createBy : '';
  }
}
