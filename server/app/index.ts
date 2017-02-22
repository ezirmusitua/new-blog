import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes/index';
import { UserModel, UserDocument } from './models/user';
import { SessionModel, SessionDocument } from './models/session';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blog');

const port = 3000;
const app = new Koa();
app.use(cors());
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', err);
    }
}));
app.use(async (ctx: any, next) => {
    const authHeader = ctx.headers.authorization;
    ctx.session = { isVisitor: true };
    if (authHeader) {
        const matchRes = authHeader.match(/token="(\w+)"&user="(\w+)"/).slice(1, 3) as string[];
        const session = await SessionModel.activateSession(matchRes[0], matchRes[1]);
        ctx.session = Object.assign(session, { isVisitor: false });
    }
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log('listening on port 3000'));

export default app;
