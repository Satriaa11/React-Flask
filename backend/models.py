from app import db

class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=False)
    img_url = db.Column(db.String(200), unique=False, nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'description': self.description,
            'gender': self.gender,
            'img_url': self.img_url
        }