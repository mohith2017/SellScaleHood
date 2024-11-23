from flask import Flask
from flask_cors import CORS
from routes import query, home, buyStock, sellStock

def create_app():
    app = Flask(__name__)
    CORS(app)

    
    app.register_blueprint(query.bp)
    app.register_blueprint(buyStock.bp)
    app.register_blueprint(sellStock.bp)
    app.register_blueprint(home.bp)

    return app
