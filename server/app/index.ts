import Koa from 'koa';
import bodyParser from 'koa-bodyparser';



const app = new Koa();
const port = 3000;

app.use(bodyParser());
app.use(ctx => ctx.body = 'Hello Koa');

app.listen(port, () => console.log('hello world'));

export default app;