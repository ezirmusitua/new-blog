import Router from 'koa-router';
import { UserModel } from '../models/user';
import { SessionModel } from '../models/session';

const router = new Router({ prefix: '/user' });

router.post('alive', '/alive', async (ctx, next) => {
  const token = ctx.request.body.token as string;
  const userId = ctx.request.body.userId as string;
  console.log(token, userId);
  ctx.body = await SessionModel.activateSession(token, userId);
  await next();
});
router.post('login', '/login', async (ctx, next) => {
  const email = ctx.request.body.email as string;
  const password = ctx.request.body.password as string;
  const user = await UserModel.findUserByEmailAndPassword(email, password);
  const session = await SessionModel.updateOrCreateSession(user._id.toString())
  ctx.body = session;
  await next();
});
router.delete('logout', '/logout', async (ctx: any, next) => {
  if (!ctx.session) {
    console.log('no session, can not logout');
  }
  await SessionModel.removeSession(ctx.session.token, ctx.session.userId);
});
router.put('activate', '/activate', async (ctx: any, next) => {
  await SessionModel.activateSession(ctx.session.token, ctx.session.userId);
  await next();
});
router.post('create', '/', async (ctx, next) => {
  const body = ctx.request.body;
  const newTodo = new UserModel(body);
  await newTodo.save();
  ctx.body = newTodo;
  await next();
});
router.put('update', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  const body = ctx.request.body;
  ctx.body = await UserModel.update({ _id }, { $set: body });
  await next();
});
router.delete('delete', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  ctx.body = await UserModel.remove({ _id });
  await next();
});

export default router;

