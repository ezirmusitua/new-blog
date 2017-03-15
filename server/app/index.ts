import db from './database';
import app from './app';
import { readConfigFile } from './config';

const env = process.env.NODE_ENV || 'development';
const config = readConfigFile(env);

db.connect(config);
app.start(config);
