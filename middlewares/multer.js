require("dotenv").config();
const multer = require("multer");
const path = require("path");
const MulterAzureStorage = require("multer-azure-blob-storage").MulterAzureStorage;

const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
    const blobName = `${Date.now()}-${file.originalname}-${req.body.fullName}`;
    resolve(blobName);
  });
};

const resolveMetadata = (req, file) => {
  return new Promise((resolve, reject) => {
    const metadata = { author: req.body.fullName };
    resolve(metadata);
  });
};

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Please upload image only");
  }
}

const upload = multer({
  preservePath: true,
  storage: new MulterAzureStorage({
    connectionString: process.env.STRACCOUNT_CONNECTION,
    accessKey: process.env.STRACCOUNT_ACCESS_KEY,
    accountName: process.env.STRACCOUNT_ACCOUNT_NAME,
    containerName: process.env.STRACCOUNT_CONTAINER_NAME,
    containerAccessLevel: "blob",
    blobName: resolveBlobName,
    metadata: resolveMetadata,
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
