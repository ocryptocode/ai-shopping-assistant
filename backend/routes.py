from app import app, db
from models import User

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.name for user in users])

@app.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully!'}), 201&
