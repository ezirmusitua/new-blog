import * as Router from 'koa-router';
import { ExtendCtx } from '../models/ctx';
import { UserModel, UserDocument } from '../models/user';
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
  const session = await SessionModel.updateOrCreateSession(user as UserDocument)
  ctx.body = session;
  await next();
});

router.delete('logout', '/logout', async (ctx: ExtendCtx, next) => {
  if (ctx.isVisitor) throw new APIError(AdminError.sessionNotFound);
  const ctxSession = ctx.session;
  if (ctxSession) {
    SessionModel.removeSession(ctxSession.token, ctxSession.userId);
  }
  await next();
});

router.put('activate', '/activate', async (ctx: ExtendCtx, next) => {
  const ctxSession = ctx.session;
  if (ctxSession) {
    await SessionModel.activateSession(ctxSession.token, ctxSession.userId);
  }
  await next();
});

export const userRouter = router;
