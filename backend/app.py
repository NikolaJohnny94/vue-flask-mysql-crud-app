from flask import Flask
from flask_restful import Api, Resource, marshal_with, abort
from flask_sqlalchemy import SQLAlchemy
from user_args import user_args
from user_resource_fields import resource_fields
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config.Config')
api = Api(app)
db = SQLAlchemy(app)
CORS(app)


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True,)
    firstname = db.Column(db.String(45), index=True, nullable=False)
    lastname = db.Column(db.String(45), index=True, nullable=False)
    email = db.Column(db.String(45), index=True, unique=True)
    country = db.Column(db.String(45), index=True, nullable=False)
    city = db.Column(db.String(45), index=True, nullable=False)

    def __init__(self, firstname, lastname, email, country, city):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.country = country
        self.city = city

    def __repr__(self) -> str:
        return "User: \n First Name: {firstname} \n Last Name: {lastname} \n Email: {email} \n Country: {country}\n City: {city}".format(firstname=self.firstname, lastname=self.lastname, email=self.email, country=self.country, city=self.city)


class Users(Resource):

    @marshal_with(resource_fields)
    def get(self) -> list[dict]:
        users = UserModel.query.all()
        return users, 200

    @marshal_with(resource_fields)
    def post(self) -> dict:
        args = user_args.parse_args()
        user = UserModel(firstname=args['firstname'], lastname=args['lastname'],
                         email=args['email'], country=args['country'], city=args['city'])
        db.session.add(user)
        try:
            db.session.commit()
        except:
            db.session.rollback()
        return user, 201


class UserById(Resource):

    @marshal_with(resource_fields)
    def get(self, id) -> dict:
        user = UserModel.query.get(id)
        if user:
            return user, 200
        else:
            abort(404, success=False,
                  message='User with the id: {id} was not found in the database!'.format(id=id), status='404 | Not Found')

    def put(self, id) -> dict:
        args = user_args.parse_args()
        user = UserModel.query.filter_by(id=id).first()
        if user:
            user.firstname = args['firstname']
            user.lastname = args['lastname']
            user.email = args['email']
            user.country = args['country']
            user.city = args['city']
            try:
                db.session.commit()
            except:
                db.session.rollback()
            return {"message": "User with the Id: {id} was successfully updated!".format(id=id)}, 200
        else:
            return {"success": False, "status": "400 | BAD REQUEST", "message": "There was a problem while trying to update user with the id of {id}".format(id=id)}, 400

    def delete(self, id) -> dict:
        user = UserModel.query.get(id)
        if user:
            db.session.delete(user)
            try:
                db.session.commit()
            except:
                db.session.rollback()
            return {"success": True, "status": "200 | OK", "message": "User with the Id: {id} was successfully deleted!".format(id=id)}, 200
        else:
            return {"success": False, "status": "404 | NOT FOUND", "message": "User with the Id: {id} was not found in the database!".format(id=id)}, 404


api.add_resource(Users, '/users/')
api.add_resource(UserById, '/users/<int:id>/')

if __name__ == '__main__':
    app.run(debug=True)
