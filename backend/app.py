from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Konfigurasi untuk Railway
if os.environ.get('RAILWAY_ENVIRONMENT'):
    # Gunakan path absolut untuk database di Railway
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////instance/friends.db'
else:
    # Konfigurasi lokal
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

# Import routes setelah inisialisasi app dan db
from routes import *

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))