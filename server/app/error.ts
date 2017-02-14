interface CustomError {
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
