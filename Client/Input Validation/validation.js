const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const conn = new sqlite3.Database('media.db');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ //middleware
  storage: storage,
  limits: { fileSize: 1000000 }, // file size limit of 1 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('mediaFile');


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb('Error: Images and GIFs only');
  }
}

// file uploads
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const { filename, mimetype, size } = req.file;
      const { userId } = req.body;
      // file metadata goes to SQL database
      conn.run('INSERT INTO media (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)', [filename, mimetype, size, userId], function (err) {
        if (err) {
          res.status(500).json({ message: 'Error saving file metadata to database' });
        } else {
          res.status(200).json({ message: 'File uploaded successfully' });
        }
      });
    }
  });
});

// start server
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
