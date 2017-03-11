import mongoose from 'mongoose';

mongoose.Promise = Promise;

const db = {
  connect: (config: any) => {
    mongoose.connect(config.db, config.db_options, (error) => {
      console.error('mongoose connect error: \n\x1b[31m', error);
    });
    mongoose.connection.on('error', (error) => {
      console.error('mongoose error: \n\x1b[31m', error);
      mongoose.disconnect();
    });
    mongoose.connection.on('connected', () => {
      console.info('\n\x1b[32mmongoose connect to ' + config.db + ' successed');
    });
    mongoose.connection.once('open', function () {
      console.log('\n\x1b[32mmongoose connection opened');
    });
    mongoose.connection.on('disconnected', () => {
      console.info('\n\x1b[33mmongoose disconnect to ' + config.db + ' successed');
      mongoose.connect(config.db, config.db_options);
    });
    mongoose.connection.on('reconnected', function () {
      console.log('\n\x1b[33mmongoose reconnected to ' + config.db + ' successed');
    });
    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log('\x1b[33mmongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  },
};

export default db;
