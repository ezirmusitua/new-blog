import Router from 'koa-router';
import { UserModel } from '../models/user';
import { SessionModel } from '../models/session';

const router = new Router({ prefix: '/user' });

router.post('alive', '/alive', async (ctx, next) => {
  const token = ctx.request.body.token as string;
  const userId = ctx.request.body.userId as string;
  ctx.body = await SessionModel.activateSession(token, userId);
  await next();
});
router.post('login', '/login', async (ctx, next) => {
  const email = ctx.request.body.email as string;
  const password = ctx.request.body.password as string;
  const user = await UserModel.findUserByEmailAndPassword(email, password);
  if (!user) throw { status: 404, message: 'invalid email or password!' };
  // TODO: update User Session after login
  const session = await SessionModel.updateOrCreateSession(user._id.toString())
  console.log(session);
  ctx.body = session;
  await next();
});
router.put('activate', '/activate', async (ctx: any, next) => {
  console.log(ctx.session);
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

