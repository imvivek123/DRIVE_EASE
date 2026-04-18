from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.extensions import db
from app.models import Booking, Car, User

bp = Blueprint('bookings', __name__, url_prefix='/api/bookings')


def booking_to_dict(booking):
    return {
        'id': booking.id,
        'user_id': booking.user_id,
        'car_id': booking.car_id,
        'user_name': booking.user.name,
        'car_name': booking.car.name,
        'start_date': booking.start_date.isoformat(),
        'end_date': booking.end_date.isoformat(),
        'total_price': booking.total_price,
        'status': booking.status,
        'created_at': booking.created_at.isoformat()
    }


@bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    identity = get_jwt_identity()
    user_id = identity['user_id']
    
    data = request.get_json()
    
    if not data or not data.get('car_id') or not data.get('start_date') or not data.get('end_date'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    car = Car.query.get(data['car_id'])
    
    if not car:
        return jsonify({'message': 'Car not found'}), 404
    
    if not car.is_available:
        return jsonify({'message': 'Car is not available'}), 400
    
    try:
        start_date = datetime.fromisoformat(data['start_date']).date()
        end_date = datetime.fromisoformat(data['end_date']).date()
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use ISO format (YYYY-MM-DD)'}), 400
    
    days = (end_date - start_date).days
    if days <= 0:
        return jsonify({'message': 'End date must be after start date'}), 400
    
    total_price = days * car.price_per_day
    
    booking = Booking(
        user_id=user_id,
        car_id=data['car_id'],
        start_date=start_date,
        end_date=end_date,
        total_price=total_price,
        status='pending'
    )
    
    car.is_available = False
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify(booking_to_dict(booking)), 201


@bp.route('/me', methods=['GET'])
@jwt_required()
def get_my_bookings():
    identity = get_jwt_identity()
    user_id = identity['user_id']
    
    bookings = Booking.query.filter_by(user_id=user_id).all()
    
    return jsonify([booking_to_dict(booking) for booking in bookings]), 200


@bp.route('/', methods=['GET'])
@jwt_required()
def get_all_bookings():
    identity = get_jwt_identity()
    
    if not identity['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403
    
    bookings = Booking.query.all()
    
    return jsonify([booking_to_dict(booking) for booking in bookings]), 200


@bp.route('/<int:id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(id):
    identity = get_jwt_identity()
    
    if not identity['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403
    
    booking = Booking.query.get(id)
    
    if not booking:
        return jsonify({'message': 'Booking not found'}), 404
    
    data = request.get_json()
    
    if not data or not data.get('status'):
        return jsonify({'message': 'Status field is required'}), 400
    
    booking.status = data['status']
    
    # If booking is cancelled, mark car as available again
    if data['status'] == 'cancelled' and booking.car.is_available == False:
        booking.car.is_available = True
    
    db.session.commit()
    
    return jsonify(booking_to_dict(booking)), 200
