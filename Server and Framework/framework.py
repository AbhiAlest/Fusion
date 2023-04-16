from flask import Flask, request, render_template, redirect, url_for
import os
import sqlite3
import string
import random

app = Flask(__name__)
UPLOAD_FOLDER = '/path/to/upload/folder'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS #makes sure that it's an allowed file

def id_generator(size=6, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '': #submit without filename if no file/browser
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_id = id_generator()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_id))
            conn = sqlite3.connect('media.db')
            c = conn.cursor()
            c.execute("INSERT INTO media (id, filename) VALUES (?, ?)", (file_id, filename))
            conn.commit()
            conn.close()
            return redirect(url_for('share', id=file_id))
    return render_template('home.html')

@app.route('/share/<id>')
def share(id):
    conn = sqlite3.connect('media.db')
    c = conn.cursor()
    c.execute("SELECT * FROM media WHERE id=?", (id,))
    media = c.fetchone()
    conn.close()
    if media is None:
        return "Media not found"
    else:
        return render_template('share.html', media=media)

if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.run(debug=True)
