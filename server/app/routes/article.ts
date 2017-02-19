import Router from 'koa-router';
import { ArticleModel, generateCatalog } from '../models/article';

const router = new Router({ prefix: '/article' });

router.get('listAllForVisitor', '/', async (ctx, next) => {
  const articles = await ArticleModel.list({ viewCategory: 300 }, {
    catalog: false,
    htmlContent: false,
  });
  ctx.body = JSON.stringify({
    count: articles.length,
    items: articles.map(article => {
      return Object.assign(article, {
        description: article.markdownContent.substr(0, 100),
        markdownContent: ''
      });
    })
  });
  await next();
})

router.get('fetchOne', '/:articleId', async (ctx, next) => {
  const _id = ctx.params.articleId;
  const article = await ArticleModel.fetchById(_id)
  ctx.body = JSON.stringify(article);
  await next();
})


router.get('test', '/test/generateCatalog', (ctx, next) => {
  const targetStr = "## Test article\n\nthis is an test article\n\nyou want to know test for what?\n\ni wont't tell you ~ \n\n### look at me\n\nfunk you !";
  ctx.body = generateCatalog(targetStr);
})

export default router;
