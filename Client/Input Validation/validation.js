const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// database connection
const dbPath = path.resolve(__dirname, 'media.db');
const db = new sqlite3.Database(dbPath);

// uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, 'static/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

// multer middleware forfile uploads
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // file metadata goes to SQL database
  const { originalname, mimetype, filename, size } = req.file;
  const query = `INSERT INTO media (filename, mimetype, size) VALUES (?, ?, ?)`;
  db.run(query, [filename, mimetype, size], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Error storing file metadata' });
    }
    // url goes to client
    const fileUrl = req.protocol + '://' + req.get('host') + '/uploads/' + filename;
    res.status(200).json({ url: fileUrl });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
