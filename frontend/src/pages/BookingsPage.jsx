import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't made any bookings yet.</p>
            <Link to="/cars" className="bg-blue-900 text-white px-6 py-2 rounded inline-block hover:bg-blue-800 transition">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Car</p>
                    <p className="text-lg font-bold">{booking.car_name}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Booking Dates</p>
                    <p className="text-lg font-semibold">
                      {new Date(booking.start_date).toLocaleDateString()} to{' '}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Total Price</p>
                    <p className="text-lg font-bold text-blue-900">₹{booking.total_price}</p>
                  </div>

                  <div className="flex items-center">
                    <span className={`px-4 py-2 rounded font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
