const upload = require('multer')();

exports.uploadS3 = upload.fields([
  { name: 'title' },
  { name: 'cover' },
  { name: 'pages' }
]);
