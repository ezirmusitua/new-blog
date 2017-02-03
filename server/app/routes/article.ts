import Router from 'koa-router';
import { ArticleModel } from '../models/article';

const router = new Router({ prefix: '/article' });

router.get('list', '/', async (ctx, next) => {
  ctx.body = await ArticleModel.find().lean();
  await next();
});
router.get('fetchOne', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  ctx.body = await ArticleModel.findOne({ _id }).lean();
  await next();
});
router.post('create', '/', async (ctx, next) => {
  const body = ctx.request.body;
  const newTodo = new ArticleModel(body);
  await newTodo.save();
  ctx.body = newTodo;
  await next();
});
router.put('update', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  const body = ctx.request.body;
  ctx.body = await ArticleModel.update({ _id }, { $set: body });
  await next();
});
router.delete('delete', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  ctx.body = await ArticleModel.remove({ _id });
  await next();
});

export default router;
