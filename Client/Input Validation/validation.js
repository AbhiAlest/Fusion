import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = 3000;

// SQLite database
async function init() {
  const db = await open({
    filename: 'media.db',
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      date TEXT,
      user_id INTEGER
    );
  `);
  console.log('Database initialized');
}
init();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage: storage });

// Express.js routes
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'static', 'home.html'));
});

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  const { filename, mimetype, size } = req.file;
  const { user_id } = req.body;
  const date = new Date().toISOString();

  // Add file data to database
  const db = await open({
    filename: 'media.db',
    driver: sqlite3.Database,
  });
  const { lastID } = await db.run(
    'INSERT INTO media (name, type, date, user_id) VALUES (?, ?, ?, ?)',
    [filename, mimetype, date, user_id]
  );
  console.log(`File ${filename} uploaded by user ${user_id} with ID ${lastID}`);

  res.send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
