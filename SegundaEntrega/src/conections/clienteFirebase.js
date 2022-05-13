var admin = require('firebase-admin');
const config = require('../config.json');

var serviceAccount = require('../basefirebase-f9e5a-firebase-adminsdk-t13uw-7c7311d516.json');

if (config.databases.engine === 'firebase') {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://basefirebase-f9e5a.firebaseio.com',
  });
  console.log('firebase connected');
}

module.exports = { admin, serviceAccount };
