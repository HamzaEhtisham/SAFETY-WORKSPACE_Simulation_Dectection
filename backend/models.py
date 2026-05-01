from marshmallow import Schema, fields

class UserSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    role = fields.Str(load_default="user")

class QuizAttemptSchema(Schema):
    username = fields.Str(required=True)
    topic = fields.Str(required=True)
    score = fields.Int(required=True)
    date = fields.DateTime(required=True)
