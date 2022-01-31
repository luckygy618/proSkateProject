const debug = require('debug')('api:database:filestorage');
var path = require('path');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    debug('storing file ' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
