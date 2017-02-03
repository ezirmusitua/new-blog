import Router from 'koa-router';
import articleRouter from './article';

const router = new Router;

router.use('', articleRouter.routes());

export default router;