from flask import Blueprint

bp = Blueprint('home', __name__)

@bp.route('/')
def hello():
    return "Welcome to SellScale API routes!"
