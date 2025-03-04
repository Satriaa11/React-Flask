import logging
from app import app, db
from flask import request, jsonify
from models import Friend

# Logging configuration
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    logger.info(f"Retrieved {len(result)} friends")
    return jsonify(result)

# Create a new friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json

        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        logger.info(f"Attempting to create new friend: {name}")
        # Fetch avatar image base on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_friend)
        db.session.commit()
        logger.info(f"Friend created successfully: {name}")
        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating friend: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Delete a friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        logger.info(f"Attempting to delete friend: {friend.name}")
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Friend deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error deleting friend: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Update a friend profile
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        logger.info(f"Attempting to update friend: {friend.name}")
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        data = request.json
        # updated_fields = ["name", "role", "description", "gender"]
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error updating friend: {str(e)}")
        return jsonify({"error": str(e)}), 500