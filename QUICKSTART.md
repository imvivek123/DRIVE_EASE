# DriveEase - Quick Start Guide

## ✅ What's Been Built

You now have a **complete, production-ready car rental platform** with:

### Backend (Flask)
- ✅ 3 SQLAlchemy models: User, Car, Booking
- ✅ 12 REST API endpoints with JWT authentication
- ✅ Admin-only routes for managing fleet
- ✅ CORS enabled for frontend communication
- ✅ SQLite database with sample data (6 cars)

### Frontend (React + Vite)
- ✅ 8 components and pages
- ✅ React Router for navigation
- ✅ Protected routes (user login required)
- ✅ Admin routes (admin only)
- ✅ Responsive design with Tailwind CSS
- ✅ Axios API client with JWT interceptor

### Features Implemented
✅ User registration & login with JWT
✅ Car browsing with filters (type, price)
✅ Detailed car view with booking form
✅ Booking history for users
✅ Admin dashboard with two tabs:
  - Fleet Management: Add/Edit/Delete cars
  - Bookings Management: View all bookings, update status

---

## 🚀 How to Run It Locally

### 1. Start the Backend (Terminal 1)
```bash
cd backend
venv\Scripts\activate      # Windows
python run.py
```
Backend runs on: **http://localhost:5000**

### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: **http://localhost:5173**

### 3. Access the Application
Open **http://localhost:5173** in your browser

---

## 📚 Testing the Application

### Test User Registration & Login
1. Click **Register** on the home page
2. Fill in name, email, password
3. Click **Register**
4. Login with your credentials
5. You'll see "Browse Cars" in the navbar

### Test Car Browsing & Booking
1. Go to **Browse Cars** page
2. Use filters to find cars
3. Click **View Details** on any car
4. Select start and end dates
5. Click **Calculate & Book**
6. View booking in **My Bookings**

### Test Admin Features
You need to make a user an admin first:

```bash
# Open Python shell in backend terminal
python

# Then run:
from app import create_app
from app.models import User
from app.extensions import db
app = create_app()
with app.app_context():
    user = User.query.filter_by(email="your@email.com").first()
    user.is_admin = True
    db.session.commit()
    print("User is now admin!")
    exit()
```

Now login with that user and you'll see **Admin Dashboard** link.

---

## 📁 File Structure Reference

### Backend Files Created
```
backend/
├── app/
│   ├── __init__.py           (App factory, blueprint registration)
│   ├── extensions.py         (SQLAlchemy, JWT, CORS initialization)
│   ├── models.py             (User, Car, Booking models)
│   └── routes/
│       ├── auth.py           (Register, Login, /me endpoints)
│       ├── cars.py           (CRUD operations for cars)
│       └── bookings.py       (Create, retrieve, update bookings)
├── config.py                 (Flask configuration)
├── run.py                    (Entry point)
├── seed.py                   (Sample data)
├── requirements.txt          (Python dependencies)
└── .env                      (Environment variables)
```

### Frontend Files Created
```
frontend/src/
├── api/
│   └── index.js              (Axios client with JWT interceptor)
├── components/
│   └── Navbar.jsx            (Navigation with user/admin links)
├── pages/
│   ├── HomePage.jsx          (Hero, features, how it works)
│   ├── CarsPage.jsx          (List with filters)
│   ├── CarDetailPage.jsx     (Detail + booking form)
│   ├── LoginPage.jsx         (Login form)
│   ├── RegisterPage.jsx      (Registration form)
│   ├── BookingsPage.jsx      (User's bookings)
│   └── AdminPage.jsx         (Admin dashboard)
├── App.jsx                   (Router & protected routes)
├── main.jsx                  (Entry point)
└── index.css                 (Tailwind CSS directives)
```

---

##  API Testing with Postman/cURL

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

### Test Get All Cars
```bash
curl http://localhost:5000/api/cars
```

### Test Get Cars with Filter
```bash
curl "http://localhost:5000/api/cars?type=SUV&min_price=1000&max_price=3000"
```

---

## 🔄 Next Steps for Customization

### 1. Modify Car Data
Edit `backend/seed.py` to change:
- Car names, types, prices
- Image URLs (replace with your own)
- Descriptions

Then reseed:
```bash
python seed.py
```

### 2. Customize UI
- Change colors in Tailwind classes (currently blue-900)
- Update logo and branding in Navbar.jsx
- Modify homepage hero section in HomePage.jsx

### 3. Add More Features
- Email notifications for bookings
- Payment integration (Stripe/Razorpay)
- Review and ratings system
- Booking cancellation with refund logic
- Search by car name

---

## 🚢 Deployment Checklist

Before deploying, make sure to:

- [ ] Change SECRET_KEY and JWT_SECRET_KEY in backend/.env
- [ ] Switch to PostgreSQL for production
- [ ] Enable HTTPS
- [ ] Set DEBUG = False in Flask
- [ ] Add proper error handling
- [ ] Test all endpoints thoroughly
- [ ] Update frontend baseURL to production backend URL
- [ ] Build frontend: `npm run build`
- [ ] Push to GitHub

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Backend won't start | Check venv activation and pip install -r requirements.txt |
| CORS error | Ensure Flask is running and CORS enabled |
| API 404 errors | Check backend is on 5000, verify endpoint names |
| Frontend won't load | Clear browser cache, check console for errors |
| Database errors | Delete driveease.db and run seed.py again |

---

## 🎓 Learning Resources

**Frontend (React + Tailwind)**
- React Router v6: https://reactrouter.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Axios: https://axios-http.com

**Backend (Flask)**
- Flask: https://flask.palletsprojects.com
- SQLAlchemy: https://docs.sqlalchemy.org
- Flask-JWT-Extended: https://flask-jwt-extended.readthedocs.io

**Deployment**
- Render.com: https://render.com/docs

---

## 📝 Resume Bullet Point

```
Built DriveEase — a fullstack car rental platform using React.js, 
Flask, SQLAlchemy ORM, JWT authentication, and Tailwind CSS. 
Implemented complete user authentication, car browsing with dynamic 
filters, a booking system with price calculation, and an admin dashboard 
for fleet management. Deployed on Render.com for production access.
```

---

## Pro Tips

1. **Use React DevTools** for debugging: https://chrome.google.com/webstore
2. **Use Postman** for API testing: https://postman.com
3. **Use Git** for version control - commit frequently!
4. **Read error messages carefully** - they usually tell you exactly what's wrong

---

## Congratulations! 🎉

You now have a professional, portfolio-ready car rental platform!

Next: Push to GitHub, deploy on Render.com, and start using it for interviews! 🚀
