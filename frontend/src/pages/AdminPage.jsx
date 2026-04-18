import { useState, useEffect } from 'react';
import {
  getAllCars,
  getAllBookings,
  addCar,
  updateCar,
  deleteCar,
  updateBookingStatus
} from '../api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('fleet');
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'SUV',
    price_per_day: '',
    seats: '',
    fuel: '',
    transmission: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'fleet') {
        const response = await getAllCars();
        setCars(response.data);
      } else {
        const response = await getAllBookings();
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'SUV',
      price_per_day: '',
      seats: '',
      fuel: '',
      transmission: '',
      image_url: '',
      description: ''
    });
    setEditingCar(null);
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCar = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car.id);
    setFormData({
      name: car.name,
      type: car.type,
      price_per_day: car.price_per_day,
      seats: car.seats,
      fuel: car.fuel,
      transmission: car.transmission,
      image_url: car.image_url,
      description: car.description
    });
    setShowForm(true);
  };

  const handleSaveCar = async (e) => {
    e.preventDefault();
    try {
      if (editingCar) {
        await updateCar(editingCar, formData);
      } else {
        await addCar(formData);
      }
      await fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    if (confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      await fetchData();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`py-2 px-4 font-bold ${
              activeTab === 'fleet'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-blue-900'
            }`}
          >
            Fleet Management
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-4 font-bold ${
              activeTab === 'bookings'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-600 hover:text-blue-900'
            }`}
          >
            All Bookings
          </button>
        </div>

        {/* Fleet Management Tab */}
        {activeTab === 'fleet' && (
          <div>
            <button
              onClick={handleAddCar}
              className="bg-blue-900 text-white px-6 py-2 rounded mb-6 hover:bg-blue-800 transition font-bold"
            >
              + Add New Car
            </button>

            {/* Car Form */}
            {showForm && (
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {editingCar ? 'Edit Car' : 'Add New Car'}
                </h2>
                <form onSubmit={handleSaveCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Car Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                  <input
                    type="number"
                    name="price_per_day"
                    placeholder="Price per Day"
                    value={formData.price_per_day}
                    onChange={handleFormChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    name="seats"
                    placeholder="Seats"
                    value={formData.seats}
                    onChange={handleFormChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="fuel"
                    placeholder="Fuel Type"
                    value={formData.fuel}
                    onChange={handleFormChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="transmission"
                    placeholder="Transmission"
                    value={formData.transmission}
                    onChange={handleFormChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="url"
                    name="image_url"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  ></textarea>
                  <div className="md:col-span-2 flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Cars Table */}
            {!loading && (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Price/Day</th>
                      <th className="p-3 text-left">Available</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{car.name}</td>
                        <td className="p-3">{car.type}</td>
                        <td className="p-3">₹{car.price_per_day}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            car.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {car.is_available ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* All Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            {!loading && (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">User</th>
                      <th className="p-3 text-left">Car</th>
                      <th className="p-3 text-left">Dates</th>
                      <th className="p-3 text-left">Total Price</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{booking.id}</td>
                        <td className="p-3">{booking.user_name}</td>
                        <td className="p-3">{booking.car_name}</td>
                        <td className="p-3">
                          {new Date(booking.start_date).toLocaleDateString()} to{' '}
                          {new Date(booking.end_date).toLocaleDateString()}
                        </td>
                        <td className="p-3">₹{booking.total_price}</td>
                        <td className="p-3">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
