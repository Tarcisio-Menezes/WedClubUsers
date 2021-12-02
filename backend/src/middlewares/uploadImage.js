const multer = require('multer');
const path = require('path');

const { HOST } = process.env;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },

  filename: (req, _file, callback) => {
    const { id } = req.params;
    const imageName = `${id}.jpeg`;
    const imagePath = `${HOST || 'localhost'}:3005/src/uploads/${id}.jpeg`;
    req.imagePath = imagePath;
    callback(null, imageName);
  },
});

module.exports = multer({ storage }).single('image');
