# TODO : Update this file for deployment
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

# if __name__ == '__main__':
#     app.run(debug=True)

# Upload Render Server
import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Gunakan port dari environment variable
    app.run(host="0.0.0.0", port=port)
