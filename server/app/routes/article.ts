import mongoose from 'mongoose';
import Router from 'koa-router';
import { APIError } from '../error';
import { ArticleModel } from '../models/article';

const router = new Router({ prefix: '/article' });

router.get('listAllForVisitor', '/', async (ctx: any, next) => {
  const query = {} as any;
  const countQuery = {} as any;
  if (ctx.isVisitor) {
    query.viewCategory = countQuery.viewCategory = 300;
  }
  const pageSize = parseInt(ctx.query.pageSize, 10) || 10;
  let marker = ctx.query.marker;
  const sortBy = ctx.query.sortBy || '_id';
  const sortOrder = parseInt(ctx.query.sortOrder, 10) || -1
  console.log('marker', marker);
  if (sortBy === '_id' && marker && typeof marker == 'string') {
    marker = mongoose.Types.ObjectId(marker);
  }
  if (sortOrder === -1 && marker) {
    query[sortBy] = { $lt: marker };
  }
  if (sortOrder === 1 && marker) {
    query[sortBy] = { $gt: marker };
  }
  const options = { limit: pageSize, sort: { [sortBy]: sortOrder } };
  const [totalCount, articles] = await Promise.all([
    await ArticleModel.count(countQuery).exec(),
    await ArticleModel.list(query, {
      catalog: false,
      htmlContent: false,
    }, options)
  ]);
  ctx.body = JSON.stringify({
    count: totalCount,
    items: articles.map(article => {
      return Object.assign(article, {
        description: article.markdownContent.split('  ')[0],
        markdownContent: ''
      });
    }),
    marker: articles && articles.length && articles[articles.length - 1][sortBy]
  });
  await next();
});

router.get('fetchOne', '/:articleId', async (ctx: any, next) => {
  const _id = ctx.params.articleId;
  const article = await ArticleModel.fetchById(_id);
  ctx.body = JSON.stringify(article);
  await next();
});

export default router;
