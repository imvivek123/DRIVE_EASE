from app import create_app
from app.extensions import db
from app.models import Car

app = create_app()

with app.app_context():
    # Clear existing cars
    db.session.query(Car).delete()
    
    cars = [
        Car(
            name='Toyota Fortuner',
            type='SUV',
            price_per_day=2500,
            seats=7,
            fuel='Diesel',
            transmission='Automatic',
            image_url='https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=400&h=300',
            description='Spacious 7-seater SUV perfect for family trips and off-road adventures',
            is_available=True
        ),
        Car(
            name='Mahindra XUV500',
            type='SUV',
            price_per_day=2000,
            seats=5,
            fuel='Petrol',
            transmission='Manual',
            image_url='https://images.unsplash.com/photo-1533473359331-35acde7260c9?w=400&h=300',
            description='Versatile SUV with great features and excellent fuel efficiency',
            is_available=True
        ),
        Car(
            name='Honda City',
            type='Sedan',
            price_per_day=1200,
            seats=5,
            fuel='Petrol',
            transmission='Automatic',
            image_url='https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300',
            description='Compact sedan perfect for city driving with comfortable seating',
            is_available=True
        ),
        Car(
            name='Maruti Suzuki Swift',
            type='Hatchback',
            price_per_day=800,
            seats=5,
            fuel='Petrol',
            transmission='Manual',
            image_url='https://images.unsplash.com/photo-1549399542-7e3f8b83ad1e?w=400&h=300',
            description='Fuel-efficient hatchback ideal for daily commute and short trips',
            is_available=True
        ),
        Car(
            name='Hyundai i20',
            type='Hatchback',
            price_per_day=900,
            seats=5,
            fuel='Petrol',
            transmission='Automatic',
            image_url='https://images.unsplash.com/photo-1552821206-60cc024e57e5?w=400&h=300',
            description='Stylish hatchback with modern features and smooth automatic transmission',
            is_available=True
        ),
        Car(
            name='Hyundai Creta',
            type='SUV',
            price_per_day=1800,
            seats=5,
            fuel='Diesel',
            transmission='Manual',
            image_url='https://images.unsplash.com/photo-1494438639946-1eec14d9a1fa?w=400&h=300',
            description='Premium SUV with excellent safety features and comfortable ride',
            is_available=True
        )
    ]
    
    for car in cars:
        db.session.add(car)
    
    db.session.commit()
    print(f"✓ Seeded {len(cars)} cars to database")
