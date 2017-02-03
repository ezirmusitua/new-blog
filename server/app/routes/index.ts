import Router from 'koa-router';
import userRouter from './user';
import articleRouter from './article';

const router = new Router();

router.get('default', '/', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
});
router.use('', articleRouter.routes());
router.use('', userRouter.routes());

export default router;
