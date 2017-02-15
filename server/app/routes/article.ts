import Router from 'koa-router';
import { ArticleModel } from '../models/article';

const router = new Router({ prefix: '/article' });

router.get('listAllForVisitor', '/', async (ctx, next) => {
  const articles = await ArticleModel.list();
  ctx.body = JSON.stringify(articles);
  await next();
});

router.get('fetchOne', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  ctx.body = await ArticleModel.findOne({ _id }).lean();
  await next();
})

router.post('create', '/', async (ctx: any, next) => {
  const userId = ctx.session.userId;
  const body = ctx.request.body;
  await ArticleModel.createNew(userId, body);
  ctx.body = JSON.stringify({ status: 200, message: 'create success' })
  await next();
})

router.put('update', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.articleId;
  const body = ctx.request.body;
  await ArticleModel.updateOld(_id, body);
  ctx.body = JSON.stringify({ status: 200, message: 'update success' })
  await next();
})

router.put('updateViewCategory', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.articleId
  const viewCategory = ctx.params.category
  // Add validation
  await ArticleModel.update({ _id }, { $set: { viewCategory } })
  ctx.body = JSON.stringify({ status: 200, message: 'update view category success ' })
  await next();
})

router.delete('hideArticle', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.id;
  await ArticleModel.update({ _id }, { $set: { viewCategory: 100 } }).exec();
  ctx.body = JSON.stringify({ status: 200, message: 'disable article view for visitor ' })
  await next();
})

export default router;
