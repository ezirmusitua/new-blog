import mongoose from 'mongoose';

export interface TodoDocument {
    title: string;
    isCompleted: boolean;
}

const testEnum = {
    100: 100
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    isCompleted: {
        type: Boolean,
        index: true,
        default: false
    }
});

type MongoTodoDocument = TodoDocument & mongoose.Document;

const todoModel = mongoose.model<MongoTodoDocument>('Todo', todoSchema, 'Todo');

export const TodoModel = Object.assign(todoModel, {
    StaticEnum: {
        test: testEnum
    }
});
