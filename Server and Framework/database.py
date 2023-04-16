import sqlite3
import os
from datetime import datetime

# database connection
conn = sqlite3.connect('media.db')

# date and time
now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

# Insert media to database
with open('path/to/media/file', 'rb') as file:
    file_data = file.read()
    file_name = os.path.basename(file.name)
    file_type = file.content_type
    user_id = 123 # an actual user id for who uploaded the file 
    conn.execute('INSERT INTO media (user_id, file_name, file_type, upload_date) VALUES (?, ?, ?, ?)', (user_id, file_name, file_type, now))
    media_id = conn.lastrowid

    # Save to disk
    with open(f'static/uploads/{media_id}', 'wb') as f:
        f.write(file_data)

conn.commit()
conn.close()
