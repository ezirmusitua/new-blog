import { APIError } from '../error';
import { ExtendCtx } from '../models/ctx';

export const errorHandler = async (ctx: ExtendCtx, next: any) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof APIError) {
      console.log('catch error: ', error);
      ctx.throw(error.id.toString(), error.status);
    }
  }
}
