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
  needTitle: { id: 3000, status: 400, message: 'article must have title' },
  needContent: { id: 3000, status: 400, message: 'article must have content' },
}


