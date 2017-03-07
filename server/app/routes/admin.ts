import Router from 'koa-router';
import { ArticleModel } from '../models/article';
import { APIError } from '../error';

const router = new Router({ prefix: '/admin' });

router.get('/listArticlesForAdmin', '/article', async (ctx: any, next) => {
  if (ctx.session.isVisitor) {
    throw new APIError({ id: 100, status: 400, message: 'visitor can not do this action' });
  }
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
  if (ctx.session.isVisitor) {
    throw new APIError({ id: 100, status: 400, message: 'visitor can not do this action' });
  }
  const userId = ctx.session.userId;
  const body = ctx.request.body;
  const article = await ArticleModel.createNew(userId, body);
  ctx.body = JSON.stringify(article);
  await next();
})

router.put('update', '/article/:articleId', async (ctx: any, next) => {
  if (ctx.session.isVisitor) {
    throw new APIError({ id: 100, status: 400, message: 'visitor can not do this action' });
  }
  const _id = ctx.params.articleId;
  const body = ctx.request.body;
  const article = await ArticleModel.updateOldById(_id, body);
  ctx.body = JSON.stringify(article);
  await next();
})

router.put('updateViewCategory', '/article/:articleId/viewCategory', async (ctx: any, next) => {
  if (ctx.session.isVisitor) {
    throw new APIError({ id: 100, status: 400, message: 'visitor can not do this action' });
  }
  const _id = ctx.params.articleId
  const viewCategory = ctx.params.category
  // Add validation
  await ArticleModel.update({ _id }, { $set: { viewCategory } })
  ctx.body = JSON.stringify({ status: 200, message: 'update view category success ' })
  await next();
})

router.delete('hideArticle', '/article/:articleId/viewCategory', async (ctx: any, next) => {
  if (ctx.session.isVisitor) {
    throw new APIError({ id: 100, status: 400, message: 'visitor can not do this action' });
  }
  const _id = ctx.params.id;
  await ArticleModel.update({ _id }, { $set: { viewCategory: 100 } }).exec();
  ctx.body = JSON.stringify({ status: 200, message: 'disable article view for visitor ' })
  await next();
})

export default router;
