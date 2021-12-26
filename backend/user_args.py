from flask_restful import reqparse

user_args = reqparse.RequestParser()
user_args.add_argument('firstname', type=str)
user_args.add_argument('lastname', type=str)
user_args.add_argument('email', type=str)
user_args.add_argument('country', type=str)
user_args.add_argument('city', type=str)
