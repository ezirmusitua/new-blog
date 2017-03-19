import Router from 'koa-router';
import { SessionDocument } from './session';

export interface ExtendCtx extends Router.IRouterContext {
  isVisitor?: boolean;
  session?: SessionDocument;
}
