from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Buat folder instance jika belum ada
if not os.path.exists("instance"):
    os.makedirs("instance")

# Simpan database di dalam folder instance
db_path = os.path.join(os.getcwd(), "instance", "friends.db")
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import routes

# Buat tabel saat aplikasi berjalan pertama kali
with app.app_context():
    db.create_all()
