import { SessionModel } from '../models/session';

export const sessionHandler = async (ctx: any, next) => {
  const authHeader = ctx.headers.authorization;
  ctx.isVisitor = true;
  if (authHeader) {
    const matchRes = authHeader.match(/token="(\w+)"&user="(\w+)"/).slice(1, 3) as string[];
    const session = await SessionModel.activateSession(matchRes[0], matchRes[1]);
    ctx.session = Object.assign(session, { isVisitor: false });
    ctx.isVisitor = false;
  }
  await next();
}
