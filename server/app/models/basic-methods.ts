import { APIError } from '../error';
export interface FindOptions {
  limit?: number;
  sort?: { [key: string]: number };
}

export type Callback = (err: any, res: any) => void

export const _listImmutableDocs = async <T>(Model: any, condition?: Object, projection?: Object, options?: FindOptions,
  callback?: Callback, execCallback?: Callback): Promise<T[]> => {
  const { limit, sort } = options || { limit: null, sort: { _id: -1 } };
  try {
    return await Model.find(condition, projection, callback)
      .limit(limit).sort(sort).lean(true).exec(execCallback) as T[];
  } catch (err) {
    throw new APIError({ id: 2000, status: 404, message: 'not found' });
  }
}
