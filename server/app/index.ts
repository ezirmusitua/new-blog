import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes/index';
import { UserModel, UserDocument } from './models/user';
import { SessionModel, SessionDocument } from './models/session';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blog');

const port = 3000;
const app = new Koa();
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', err);
    }
}));
app.use(async (ctx: any, next) => {
    const authHeader = ctx.headers.authorization;
    if (authHeader) {
        const matchRes = authHeader.match(/token="(\w{48})"&user="(\w{24})"/);
        const token = matchRes[1];
        const userId = matchRes[2]
        const isUserSession = ctx.session && ctx.session._id === userId && ctx.session.token === token;
        if (isUserSession && ctx.session.updateAt < Date.now() - 24 * 60 * 60 * 1000) {
            const user = await UserModel.findById({ _id: userId }).lean().exec() as UserDocument;
            const session = await SessionModel.findOneByUserId(userId);
            if (session) {
                ctx.session = Object.assign(user, {
                    token, isVisitor: false, updateAt: session.updateAt
                });
                await next();
            }
        }
    }
    ctx.session = { isVisitor: true };
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => console.log('hello world'));

export default app;