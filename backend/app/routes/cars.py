from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models import Car

bp = Blueprint('cars', __name__, url_prefix='/api/cars')


def car_to_dict(car):
    return {
        'id': car.id,
        'name': car.name,
        'type': car.type,
        'price_per_day': car.price_per_day,
        'seats': car.seats,
        'fuel': car.fuel,
        'transmission': car.transmission,
        'image_url': car.image_url,
        'is_available': car.is_available,
        'description': car.description
    }


@bp.route('/', methods=['GET'])
def get_all_cars():
    # Get query parameters for filtering
    car_type = request.args.get('type')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    available = request.args.get('available', type=str)
    
    query = Car.query
    
    if car_type:
        query = query.filter_by(type=car_type)
    
    if min_price is not None:
        query = query.filter(Car.price_per_day >= min_price)
    
    if max_price is not None:
        query = query.filter(Car.price_per_day <= max_price)
    
    if available:
        available_bool = available.lower() == 'true'
        query = query.filter_by(is_available=available_bool)
    
    cars = query.all()
    return jsonify([car_to_dict(car) for car in cars]), 200


@bp.route('/<int:id>', methods=['GET'])
def get_car(id):
    car = Car.query.get(id)
    
    if not car:
        return jsonify({'message': 'Car not found'}), 404
    
    return jsonify(car_to_dict(car)), 200


@bp.route('/', methods=['POST'])
@jwt_required()
def add_car():
    identity = get_jwt_identity()
    
    if not identity['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403
    
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('type'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    car = Car(
        name=data.get('name'),
        type=data.get('type'),
        price_per_day=data.get('price_per_day'),
        seats=data.get('seats'),
        fuel=data.get('fuel'),
        transmission=data.get('transmission'),
        image_url=data.get('image_url'),
        description=data.get('description'),
        is_available=data.get('is_available', True)
    )
    
    db.session.add(car)
    db.session.commit()
    
    return jsonify(car_to_dict(car)), 201


@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_car(id):
    identity = get_jwt_identity()
    
    if not identity['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403
    
    car = Car.query.get(id)
    
    if not car:
        return jsonify({'message': 'Car not found'}), 404
    
    data = request.get_json()
    
    car.name = data.get('name', car.name)
    car.type = data.get('type', car.type)
    car.price_per_day = data.get('price_per_day', car.price_per_day)
    car.seats = data.get('seats', car.seats)
    car.fuel = data.get('fuel', car.fuel)
    car.transmission = data.get('transmission', car.transmission)
    car.image_url = data.get('image_url', car.image_url)
    car.description = data.get('description', car.description)
    car.is_available = data.get('is_available', car.is_available)
    
    db.session.commit()
    
    return jsonify(car_to_dict(car)), 200


@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_car(id):
    identity = get_jwt_identity()
    
    if not identity['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403
    
    car = Car.query.get(id)
    
    if not car:
        return jsonify({'message': 'Car not found'}), 404
    
    db.session.delete(car)
    db.session.commit()
    
    return jsonify({'message': 'Car deleted successfully'}), 200
