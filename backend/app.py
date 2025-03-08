from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

if not os.path.exists("instance"):
    os.makedirs("instance")

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///instance/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()
