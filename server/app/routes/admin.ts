import Router from 'koa-router';
import { ArticleModel } from '../models/article';

const router = new Router({ prefix: '/admin' });

router.get('/listArticlesForAdmin', '/article', async (ctx, next) => {
  const query = {} as any;
  const options = {} as any;
  if (ctx.params.viewCategory) {
    query.viewCategory = parseInt(ctx.params.viewCategory, 10);
  }
  if (ctx.params.title) {
    query.title = { $regex: ctx.params.title, $options: 'i' };
  }
  if (ctx.params.sort_by && ctx.params.sort_order) {
    options.sort = { [ctx.params.sort_by]: ctx.params.sort_order };
  }
  const articles = await ArticleModel.list(query, {}, options);
  ctx.body = JSON.stringify(articles);
  await next();
});

router.post('create', '/article', async (ctx: any, next) => {
  const userId = ctx.session.userId;
  const body = ctx.request.body;
  const article = await ArticleModel.createNew(userId, body);
  ctx.body = JSON.stringify(article);
  console.log(article);
  await next();
})

router.put('update', '/article/:articleId', async (ctx, next) => {
  const _id = ctx.params.articleId;
  const body = ctx.request.body;
  const article = await ArticleModel.updateOldById(_id, body);
  ctx.body = JSON.stringify(article);
  await next();
})

router.put('updateViewCategory', '/article/:articleId/viewCategory', async (ctx, next) => {
  const _id = ctx.params.articleId
  const viewCategory = ctx.params.category
  // Add validation
  await ArticleModel.update({ _id }, { $set: { viewCategory } })
  ctx.body = JSON.stringify({ status: 200, message: 'update view category success ' })
  await next();
})

router.delete('hideArticle', '/article/:articleId/viewCategory', async (ctx, next) => {
  const _id = ctx.params.id;
  await ArticleModel.update({ _id }, { $set: { viewCategory: 100 } }).exec();
  ctx.body = JSON.stringify({ status: 200, message: 'disable article view for visitor ' })
  await next();
})

export default router;
