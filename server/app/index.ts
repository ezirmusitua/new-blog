import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/error-handler';
import { sessionHandler } from './middlewares/session-handler';
import router from './routes/index';
import { APIError } from './error';
import { UserModel, UserDocument } from './models/user';
import { SessionModel, SessionDocument } from './models/session';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blog');

const port = 3000;
const app = new Koa();

// cross domain
app.use(cors());

// body parser
app.use(bodyParser({
  onerror: (err, ctx) => {
    ctx.throw('body parse error', err);
  }
}));

// handle exception
app.use(errorHandler);

// session
app.use(sessionHandler);

// add routes
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log('listening on port 3000'));

export default app;
