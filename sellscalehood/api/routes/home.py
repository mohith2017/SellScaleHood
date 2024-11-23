from flask import Blueprint

bp = Blueprint('home', __name__)

@bp.route('/api/v1')
def hello():
    return "Welcome to SellScale API routes!"
