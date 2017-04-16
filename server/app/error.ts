export interface CustomError {
  id: number;
  status: number;
  message: string;
}

export class APIError extends Error {
  id: number;
  status: number;
  message: string;

  constructor(error: CustomError) {
    super(error.message);
    this.id = error.id;
    this.status = error.status;
    this.message = error.message;
  }
}

export const AdminError = {
  notAdmin: { id: 1000, status: 400, message: 'visitor can not do this action' },
  sessionNotFound: { id: 1001, status: 404, message: 'session not found' },
}

export const MongoError = {
  notFound: { id: 2000, status: 404, message: 'document not found' },
}

export const ArticleError = {
  needTitle: { id: 3000, status: 400, message: 'create article must have title' },
  needContent: { id: 3001, status: 400, message: 'update article must have content' },
  notFound: { id: 3002, status: 404, message: 'article not found' },
}

export const CommentError = {
  needEntityId: { id: 4000, status: 400, message: 'create comment must have entityId' },
  needContent: { id: 4001, status: 400, message: 'create comment must have content' },
  needCreateBy: { id: 4002, status: 400, message: 'create comment must have createBy' },
}

export const LikeError = {
  needEntityId: { id: 5000, status: 400, message: 'like must have entityId' },
  needCreateBy: { id: 5001, status: 400, message: 'like must have createBy' },
}
