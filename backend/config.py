from os import environ


class Config:
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')
    SQLALCHEMY_DATABASE_URI = "mysql://{username}:{password}@{host}/{db_name}".format(
        username=environ.get('MYSQL_USERNAME'), password=environ.get('MYSQL_PASSWORD'), host=environ.get('MYSQL_HOST'), db_name=environ.get('MYSQL_DB'))
    SQLALCHEMY_TRACK_MODIFICATIONS = environ.get(
        'SQLALCHEMY_TRACK_MODIFICATIONS')
