const upload = require('multer')();

exports.uploadS3 = upload.fields([
  { name: 'cover' },
  { name: 'pages[]' }
]);
