from flask import Flask
from config import Config
from app.extensions import db, jwt, cors
from app.routes import auth, cars, bookings


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(auth.bp)
    app.register_blueprint(cars.bp)
    app.register_blueprint(bookings.bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app
