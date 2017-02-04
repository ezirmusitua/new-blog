import Router from 'koa-router';
import { UserModel } from '../models/user';
import { SessionModel } from '../models/session';

const router = new Router({ prefix: '/user' });

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
router.put('activate', '/activate', async (ctx, next) => {
  console.log(ctx.headers);
  const authHeader = ctx.headers.authorization;
  const matchRes = authHeader.match(/token="(\w{48})"&user="(\w{24})"/);
  await SessionModel.activateSession(matchRes[1], matchRes[2]);
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

