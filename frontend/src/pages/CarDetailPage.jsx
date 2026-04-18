import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, createBooking } from '../api';

export default function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    startDate: '',
    endDate: ''
  });
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarById(id);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car:', error);
        setError('Failed to load car details');
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const calculateCost = () => {
    if (booking.startDate && booking.endDate && car) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        setTotalCost(days * car.price_per_day);
      }
    }
  };

  useEffect(() => {
    calculateCost();
  }, [booking.startDate, booking.endDate, car]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!booking.startDate || !booking.endDate) {
      setError('Please select both dates');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await createBooking(car.id, booking.startDate, booking.endDate);
      setSuccess('Booking created successfully!');
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center py-12">Car not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={car.image_url}
            alt={car.name}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Car Info */}
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
                
                <div className="mb-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mr-2">
                    {car.type}
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
                    {car.is_available ? 'Available' : 'Not Available'}
                  </span>
                </div>

                <p className="text-gray-600 text-lg mb-6">{car.description}</p>

                {/* Specs Table */}
                <div className="bg-gray-50 rounded p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Price per Day</p>
                      <p className="text-2xl font-bold text-blue-900">₹{car.price_per_day}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Seats</p>
                      <p className="text-2xl font-bold">{car.seats}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fuel Type</p>
                      <p className="text-lg font-semibold">{car.fuel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Transmission</p>
                      <p className="text-lg font-semibold">{car.transmission}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-blue-50 p-6 rounded-lg h-fit">
                <h3 className="text-2xl font-bold mb-4">Book Now</h3>
                <form onSubmit={handleBooking}>
                  {error && (
                    <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm">
                      {success}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={booking.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={booking.endDate}
                      onChange={handleInputChange}
                      min={booking.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>

                  {totalCost > 0 && (
                    <div className="bg-white p-4 rounded mb-6 border-2 border-blue-900">
                      <p className="text-gray-600 mb-2">Total Cost</p>
                      <p className="text-3xl font-bold text-blue-900">₹{totalCost}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !car.is_available}
                    className="w-full bg-blue-900 text-white py-3 rounded font-bold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Booking...' : 'Calculate & Book'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
