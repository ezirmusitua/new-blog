import app from './app';
import { readConfigFile } from './config';
import { Database } from './database';

const env = process.env.NODE_ENV || 'development';
const config = readConfigFile(env);

Database.connect(config);
app.start(config);
