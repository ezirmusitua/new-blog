import { SessionModel } from '../models/session';
import { UserModel } from '../models/user';
import { ExtendCtx } from '../models/ctx';

export const sessionHandler = async (ctx: ExtendCtx, next: any) => {
  const authHeader = ctx.headers.authorization;
  ctx.isVisitor = true;
  ctx.isAdmin = false;
  if (authHeader) {
    const matchRes = authHeader.match(/token="(\w+)"&user="(\w+)"/).slice(1, 3) as string[];
    const session = await SessionModel.activateSession(matchRes[0], matchRes[1]);
    if (session) {
      ctx.session = Object.assign(session, { isVisitor: false });
      ctx.isAdmin = UserModel.Role.ADMIN === session.role;
      ctx.isVisitor = false;
    } else {
      ctx.isVisitor = true;
    }
  }
  await next();
}
