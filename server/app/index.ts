import db from './database';
import app from './app';
import { readConfigFile } from './config';

const env = 'development' || process.env.NODE_ENV
const config = readConfigFile(env);

db.connect(config);
app.start(config);
