// enable auth
// mongod --auth --port 27017 --dbpath /data/db1
print('hello mongo');
// 为 db 新建用户
db.createUser({
  user: 'jferroal',
  pwd: '123456',
  customData: { description: 'admin user for ngkoa-blog mongo db' },
  roles: [{ role: 'dbAdmin', db: 'ngkoa-blog' }]
});
// 新建 collection 和初始用户
db.createCollection('User');
db.User.createIndex({ email: 1 });
db.User.insert({
  email: 'jferroal@gmail.com',
  password: '123456'
})
