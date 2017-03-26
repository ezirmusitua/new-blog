import Router from 'koa-router';
import adminRouter from './admin';
import articleRouter from './article';
import userRouter from './user';

const router = new Router();

router.get('default', '/', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
});
router.use('', adminRouter.routes());
router.use('', articleRouter.routes());
router.use('', userRouter.routes());

export default router;
