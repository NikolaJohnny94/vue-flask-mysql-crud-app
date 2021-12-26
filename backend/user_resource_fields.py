from flask_restful import fields


resource_fields = {
    'id': fields.Integer,
    'firstname': fields.String,
    'lastname': fields.String,
    'email': fields.String,
    'country': fields.String,
    'city': fields.String,
}
