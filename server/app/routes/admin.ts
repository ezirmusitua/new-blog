import Router from 'koa-router';
import { ExtendCtx } from '../models/ctx';
import { ArticleModel } from '../models/article';
import { APIError, AdminError } from '../error';

const router = new Router({ prefix: '/admin' });

router.post('updateOrcreate', '/article/:articleId', async (ctx: ExtendCtx, next) => {
  if (!ctx.isAdmin) throw new APIError(AdminError.notAdmin);
  const _id = ctx.params.articleId;
  const body = ctx.request.body;
  let article;
  if (_id === 'new') {
    article = await ArticleModel.createNew(ctx.session.userId, body);
  } else {
    article = await ArticleModel.updateOldById(_id, body);
  }
  ctx.body = { data: { article } };
  await next();
});

export default router;
