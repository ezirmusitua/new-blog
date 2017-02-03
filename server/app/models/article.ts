import mongoose from 'mongoose';

export interface ArticleDocument {
    title: string;
    updateAt: number;
    createBy: string;
    markdownContent: string;
    htmlContent: string;
    catalog: { title: string; progress: number; }[]
    isShow: boolean;
    tags: { label: string }[];
}

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    updateAt: Date,
    createBy: String,
    markdownContent: String,
    htmlContent: String,
    catalog: {
        type: {
            title: String,
            progress: Number,
        },
        default: [],
    },
    isShow: {
        type: Boolean,
        index: true,
        default: false,
    },
    tags: {
        type: [{
            label: String,
        }],
        default: [],
        index: true,
    }
});

type MongoArticleDocument = ArticleDocument & mongoose.Document;

const articleModel = mongoose.model<MongoArticleDocument>('Article', articleSchema, 'Article');

export const ArticleModel = Object.assign(articleModel, {});
