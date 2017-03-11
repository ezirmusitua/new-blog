import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import router from './routes/index';
import { errorHandler } from './middlewares/error-handler';
import { sessionHandler } from './middlewares/session-handler';

const koa = new Koa();

// cross domain
koa.use(cors());

// body parser
koa.use(bodyParser({
  onerror: (err, ctx) => {
    ctx.throw('body parse error', err);
  }
}));

// handle exception
koa.use(errorHandler);

// session
koa.use(sessionHandler);

// add routes
koa.use(router.routes());
koa.use(router.allowedMethods());

const app = {
  koa,
  start: (config: any) => {
    koa.listen(config.port, () => {
      console.log('\x1b[37mAlready exists routes: \n');
      for (let i = 0; i < router.stack.length; i += 1) {
        const layer = router.stack[i];
        console.info('  \x1b[32m' + layer.methods.join(' | ') + ' : ' + layer.name);
      }
      console.log('\n\n\x1b[37mlistening on port 3000')
    });
  }
}

export default app;
