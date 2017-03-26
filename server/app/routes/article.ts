
import Router from 'koa-router';

import { ExtendCtx } from '../models/ctx';
import { ArticleModel } from '../models/article';
import { CommentModel } from '../models/comment';
import { LikeModel } from '../models/like';

const router = new Router({ prefix: '/article' });

router.get('list', '/', async (ctx: ExtendCtx, next) => {
  const condition = { viewCategory: ArticleModel.Enum.ViewCategory.PUBLISHED } as any;
  const projection = { title: true, updateAt: true } as any;
  if (ctx.isAdmin) {
    condition.viewCategory = { $in: [ArticleModel.Enum.ViewCategory.DRAFT, ArticleModel.Enum.ViewCategory.PUBLISHED] };
    projection.belongToLabel = true;
  } else {
    projection.description = true;
  }
  const options = {
    limit: ctx.params.latest ? 20 : null,
    sort: { updateAt: -1 },
  }
  const articles = await ArticleModel.list(condition, projection, options);
  console.log(articles);
  const data = { count: articles.length, items: articles, };
  ctx.body = JSON.stringify({ data });
  await next();
});

router.get('fetchById', '/:articleId', async (ctx: ExtendCtx, next) => {
  const _id = ctx.params.articleId;
  const mode = ctx.params.mode;
  const projection = { title: true, description: true, updateAt: true, coverUrl: true } as any;
  if (mode === 'edit' || mode === 'view') {
    projection.content = true;
  }
  if (mode === 'edit') {
    projection.images = true;
  }
  const article = await ArticleModel.fetchById(_id);
  let data = { article };
  if (mode === 'view' || mode === 'list') {
    // like count and comment count
    const [likeCount, commentCount] = await Promise.all<number>([
      LikeModel.countOfEntity(_id), CommentModel.countOfEntity(_id),
    ]);
    data = Object.assign({ likeCount, commentCount }, data);
  }
  ctx.body = { data };
  await next();
});

router.get('listComment', '/:articleId/comment', async (ctx: ExtendCtx, next) => {
  const _id = ctx.params.articleId;
  const comments = await CommentModel.listForEntity(_id);
  ctx.body = {
    data: {
      count: comments.length,
      items: comments,
    }
  };
  await next();
});

router.post('postComment', '/:article/comment', async (ctx: ExtendCtx, next) => {
  const _id = ctx.params.articleId;
  const body = ctx.params.body
  await CommentModel.post(Object.assign({ entityId: _id }, body));
  await next();
});

router.post('likeArticle', '/:article/like', async (ctx: ExtendCtx, next) => {
  const _id = ctx.params.articleId;
  const userId = ctx.session.userId;
  await LikeModel.like(_id, userId);
  await next();
});

router.delete('unlikeArticle', '/:article/like', async (ctx: ExtendCtx, next) => {
  const _id = ctx.params.articleId;
  const userId = ctx.session.userId;
  await LikeModel.unlike(_id, userId);
  await next();
});

export default router;
