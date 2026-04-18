import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../api';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    min_price: '',
    max_price: ''
  });

  const fetchCars = async (filterParams = {}) => {
    setLoading(true);
    try {
      const response = await getAllCars(filterParams);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filterParams = {};
    if (filters.type) filterParams.type = filters.type;
    if (filters.min_price) filterParams.min_price = parseFloat(filters.min_price);
    if (filters.max_price) filterParams.max_price = parseFloat(filters.max_price);
    
    fetchCars(filterParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Browse Our Fleet</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Car Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Price</label>
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Price</label>
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Max"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            <p className="mt-4 text-gray-600">Loading cars...</p>
          </div>
        )}

        {/* Cars Grid */}
        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {car.type}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {car.seats} Seats
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {car.fuel} • {car.transmission}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-900">
                      ₹{car.price_per_day}/day
                    </span>
                    <Link
                      to={`/cars/${car.id}`}
                      className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Cars Found */}
        {!loading && cars.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No cars found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
