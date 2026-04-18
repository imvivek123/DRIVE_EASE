# DriveEase - Car Rental Booking Platform

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![Flask](https://img.shields.io/badge/Flask-3.0-green?logo=flask)
![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightblue?logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

A **full-stack car rental booking platform** that allows users to browse cars, filter by type and price, register/login with JWT authentication, make bookings, and admins to manage the fleet and view all reservations.



## ✨ Features

### For Users
- 🔐 **User Authentication** - Register, login, and manage your account with JWT tokens
- 🚗 **Browse Cars** - View all available cars with detailed specifications
- 🔍 **Filter & Search** - Filter cars by type (SUV, Sedan, Hatchback) and price range
- 📅 **Easy Booking** - Select dates and book cars with instant price calculation
- 📋 **Booking History** - View all your bookings and their status (pending, confirmed, completed)

### For Admins
- 🛠️ **Fleet Management** - Add, edit, delete cars from the system
- 📊 **Reservation Management** - View all bookings and update their status
- 📈 **Dashboard** - Centralized admin dashboard with two tabs for cars and bookings

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js (Vite) + Tailwind CSS | User interface, routing, styling |
| **Backend** | Python + Flask | REST API, business logic |
| **Database** | SQLite (dev) / PostgreSQL (prod) | Data persistence |
| **ORM** | SQLAlchemy | Database models and queries |
| **Authentication** | JWT (JSON Web Tokens) | Secure login mechanism |
| **Styling** | Tailwind CSS | Responsive design |
| **Deployment** | Render.com | Free hosting for frontend & backend |

## 📁 Project Structure

```
driveease/
├── backend/                    # Flask API
│   ├── app/
│   │   ├── __init__.py        # App factory
│   │   ├── models.py          # SQLAlchemy models (User, Car, Booking)
│   │   ├── extensions.py      # db, jwt, cors initialization
│   │   └── routes/
│   │       ├── auth.py        # /api/auth routes
│   │       ├── cars.py        # /api/cars routes
│   │       └── bookings.py    # /api/bookings routes
│   ├── config.py              # Flask config
│   ├── run.py                 # Entry point
│   ├── seed.py                # Populate sample cars
│   ├── requirements.txt
│   └── .env                   # Environment variables
│
├── frontend/                  # React (Vite) app
│   ├── src/
│   │   ├── components/        # Navbar
│   │   ├── pages/             # HomePage, CarsPage, CarDetailPage, etc.
│   │   ├── api/               # Axios API calls
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx
│   │   └── index.css          # Tailwind CSS
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+** - [Download](https://python.org)
- **Node.js 18+** - [Download](https://nodejs.org)
- **Git** - [Download](https://git-scm.com)
- **VS Code** - [Download](https://code.visualstudio.com) (optional, recommended)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/driveease.git
cd driveease
```

#### 2. Set Up Backend

```bash
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (already included)
# Update SECRET_KEY and JWT_SECRET_KEY if needed

# Run the server
python run.py
```

The Flask server will start on `http://localhost:5000`

#### 3. Seed Sample Data
```bash
# In a new terminal (keep Flask running)
cd backend
venv\Scripts\activate
python seed.py
# You should see: ✓ Seeded 6 cars to database
```

#### 4. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The React app will open on `http://localhost:5173`

## 📚 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT token | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Car Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/cars` | Get all cars (with filters) | No |
| GET | `/api/cars/:id` | Get single car | No |
| POST | `/api/cars` | Add new car | Admin |
| PUT | `/api/cars/:id` | Update car | Admin |
| DELETE | `/api/cars/:id` | Delete car | Admin |

#### Car Filtering
```
GET /api/cars?type=SUV&min_price=1000&max_price=3000&available=true
```

### Booking Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/bookings` | Create booking | Yes |
| GET | `/api/bookings/me` | Get my bookings | Yes |
| GET | `/api/bookings` | Get all bookings | Admin |
| PUT | `/api/bookings/:id/status` | Update booking status | Admin |

#### Booking Status Values
- `pending` - Awaiting confirmation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Rental completed

## 🧪 Testing the App

### Register & Login
1. Open http://localhost:5173
2. Click "Register" and create an account
3. Login with your credentials
4. You'll be redirected to the cars page

### Browse & Book
1. View all cars and use filters
2. Click "View Details" on any car
3. Select start and end dates
4. Click "Calculate & Book"
5. Go to "My Bookings" to see your reservation

### Admin Access
1. Set a user as admin in Python shell:
```python
cd backend
python
from app import create_app
from app.models import User
from app.extensions import db

app = create_app()
with app.app_context():
    user = User.query.filter_by(email="your@email.com").first()
    user.is_admin = True
    db.session.commit()
    print("User is now admin!")
```

2. Login with that account
3. Click "Admin Dashboard" to manage cars and bookings

## 🐛 Troubleshooting

### Flask Server Won't Start
```
ModuleNotFoundError: No module named 'flask'
```
**Solution**: Make sure virtual environment is activated and requirements are installed:
```bash
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### CORS Error When Fetching from Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Make sure Flask is running and CORS is enabled in `app/__init__.py`

### React App Won't Load Cars
1. Check if backend is running on http://localhost:5000
2. Check browser console (F12) for errors
3. Verify API endpoint in `frontend/src/api/index.js` has correct baseURL

### Database Issues
To reset the database:
```bash
rm driveease.db  # Delete old database
python run.py    # Run server (creates new DB with create_all())
python seed.py   # Reseed with sample data
```

## 📦 Build for Production

### Build Frontend
```bash
cd frontend
npm run build
# Creates 'dist' folder for hosting
```

### Prepare Backend for Production
```bash
# Install gunicorn
pip install gunicorn

# Update requirements.txt
pip freeze > requirements.txt

# Add Procfile for deployment
# Content:
# web: gunicorn run:app
```

## 🌐 Deployment on Render.com

### Deploy Flask Backend
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click **New > Web Service**
4. Connect your GitHub repo
5. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn run:app`
6. Add Environment Variables:
   - `SECRET_KEY`: Any long random string
   - `JWT_SECRET_KEY`: Another long random string
   - `FLASK_ENV`: `production`
7. Deploy! You'll get a URL like: `https://driveease-api.onrender.com`

### Deploy React Frontend
1. Update `frontend/src/api/index.js` baseURL to your Render backend URL
2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
3. On Render, click **New > Static Site**
4. Connect same GitHub repo
5. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Deploy! Your frontend is live!

## 📝 Database Models

### User Model
```python
- id (Primary Key)
- name (String)
- email (String, Unique)
- password_hash (String)
- is_admin (Boolean, default: False)
- created_at (DateTime)
```

### Car Model
```python
- id (Primary Key)
- name (String)
- type (String: SUV/Sedan/Hatchback)
- price_per_day (Float)
- seats (Integer)
- fuel (String)
- transmission (String)
- image_url (String)
- is_available (Boolean, default: True)
- description (Text)
```

### Booking Model
```python
- id (Primary Key)
- user_id (Foreign Key → User)
- car_id (Foreign Key → Car)
- start_date (Date)
- end_date (Date)
- total_price (Float)
- status (String: pending/confirmed/cancelled/completed)
- created_at (DateTime)
```

## 💡 How JWT Authentication Works

1. **Registration**: User provides name, email, password → Server hashes password → User stored in DB
2. **Login**: User provides email, password → Server verifies → Returns JWT token
3. **Token Storage**: Frontend stores token in `localStorage`
4. **API Requests**: Every request includes `Authorization: Bearer <token>` header
5. **Verification**: Backend validates token before serving protected routes
6. **Token Payload**: Contains `user_id` and `is_admin` flag

## 🎓 What You'll Learn

✅ Building a fullstack web application from scratch
✅ Frontend: React.js, React Router, Axios, Tailwind CSS
✅ Backend: Flask, SQLAlchemy ORM, REST API design
✅ Authentication: JWT token-based security
✅ Database: SQLite with relationship mapping
✅ Deployment: hosting on Render.com

## 📋 Sample Booking Flow

```
User Registration
    ↓
Login (get JWT token)
    ↓
Browse Cars (GET /api/cars)
    ↓
View Car Details (GET /api/cars/:id)
    ↓
Create Booking (POST /api/bookings)
    ↓
View Bookings (GET /api/bookings/me)
    ↓
Admin Updates Status (PUT /api/bookings/:id/status)
```

## 🔐 Security Notes

⚠️ **Development Only**: The provided `.env` has default keys. For production:
- Use strong random strings for `SECRET_KEY` and `JWT_SECRET_KEY`
- Switch to PostgreSQL database
- Enable HTTPS
- Use environment variables properly
- Never commit `.env` to GitHub

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Your Name**
- [GitHub](https://github.com/yourusername)
- [LinkedIn](https://linkedin.com/in/yourprofile)
- [Portfolio](https://yourportfolio.com)

## 🙏 Acknowledgments

- Inspired by real-world car rental platforms
- Built with best practices for fullstack development
- Perfect for portfolio and internship applications

---

**Built with ❤️ using React + Flask**
