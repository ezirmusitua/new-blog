/* tslint:disable no-var-requires no-require-imports */
const mongoose = require('mongoose');

mongoose.Promise = Promise;

export class Database {
  public static alreadyRetryTimes: number = 0;

  public static connect(config: any): void {
    mongoose.connect(config.db, config.db_options, (error: any) => {
      console.error('mongoose connect error: \n\x1b[31m', error);
    });
    mongoose.connection.on('error', (error: any) => {
      console.error('mongoose error: \n\x1b[31m', error);
      mongoose.disconnect();
    });
    mongoose.connection.on('connected', () => {
      Database.alreadyRetryTimes = 0;
      console.info('\n\x1b[32mmongoose connect to ' + config.db + ' successed');
    });
    mongoose.connection.once('open', () => {
      console.log('\n\x1b[32mmongoose connection opened');
    });
    mongoose.connection.on('disconnected', () => {
      console.info('\n\x1b[33m' + Database.alreadyRetryTimes +
        ' times mongoose disconnect to ' + config.db + ' successed');
      Database.alreadyRetryTimes += 1;
      if (Database.alreadyRetryTimes < 5) {
        mongoose.connect(config.db, config.db_options);
      } else {
        process.exit(-1);
      }
    });
    mongoose.connection.on('reconnected', () => {
      console.log('\n\x1b[33m' + Database.alreadyRetryTimes +
        ' times mongoose reconnected to ' + config.db + ' successed');
    });
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('\x1b[33mmongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  }
}
