import Router from 'koa-router';
import { ExtendCtx } from '../models/ctx';
import { UserModel } from '../models/user';
import { SessionModel } from '../models/session';
import { AdminError, APIError } from '../error';

const router = new Router({ prefix: '/user' });

router.post('alive', '/alive', async (ctx: ExtendCtx, next) => {
  const token = ctx.request.body.token as string;
  const userId = ctx.request.body.userId as string;
  ctx.body = await SessionModel.activateSession(token, userId);
  await next();
});

router.post('login', '/login', async (ctx: ExtendCtx, next) => {
  const email = ctx.request.body.email as string;
  const password = ctx.request.body.password as string;
  const user = await UserModel.findUserByEmailAndPassword(email, password);
  const session = await SessionModel.updateOrCreateSession(user)
  ctx.body = session;
  await next();
});

router.delete('logout', '/logout', async (ctx: ExtendCtx, next) => {
  if (!ctx.isVisitor) throw new APIError(AdminError.sessionNotFound);
  await SessionModel.removeSession(ctx.session.token, ctx.session.userId);
});

router.put('activate', '/activate', async (ctx: ExtendCtx, next) => {
  await SessionModel.activateSession(ctx.session.token, ctx.session.userId);
  await next();
});

export default router;
