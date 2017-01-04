import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import mongoose from 'mongoose';
import {TodoModel} from './todo.model';

mongoose.connect('mongodb://localhost/blog');

const port = 3000;
const app = new Koa();
const router = new Router();
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', err);
    }
}));

router.get('default', '/', async (ctx, next) => {
    ctx.body = 'hello world';
    await next();
})
router.get('listTodos', '/todo', async (ctx, next) => {
    ctx.body = await TodoModel.find().lean();
    await next();
});
router.get('getTodo', '/todo/:id', async (ctx, next) => {
    const _id = ctx.params.id;
    ctx.body = await TodoModel.findOne({_id}).lean();
    await next();
});
router.post('createTodo', '/todo', async (ctx, next) => {
    const body = ctx.request.body;
    const newTodo = new TodoModel(body);
    await newTodo.save();
    ctx.body = newTodo;
    await next();
});
router.put('updateTodo', '/todo/:id', async (ctx, next) => {
    const _id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await TodoModel.update({_id}, {$set: body});
    await next();
});
router.delete('deleteTodo', '/todo/:id', async (ctx, next) => {
    const _id = ctx.params.id;
    ctx.body = await TodoModel.remove({_id});
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => console.log('hello world'));

export default app;