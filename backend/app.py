from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from routes import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/db_name'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(debug=True)