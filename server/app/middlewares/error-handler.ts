import { APIError } from '../error';

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof APIError) {
      console.log('catch error: ', error);
      ctx.throw(error.id.toString(), error.status);
    }
  }
}
