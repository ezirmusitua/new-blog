import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes/index';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blog');

const port = 3000;
const app = new Koa();
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', err);
    }
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => console.log('hello world'));

export default app;