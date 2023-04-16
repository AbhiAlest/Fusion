CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  upload_date TEXT NOT NULL
);
