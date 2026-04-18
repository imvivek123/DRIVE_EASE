import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Your Perfect Drive, One Click Away</h1>
          <p className="text-xl mb-8 opacity-90">
            Book your dream car today with DriveEase - affordable, reliable, hassle-free
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/cars" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Browse Cars
            </Link>
            <Link to="/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DriveEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">Wide Fleet Selection</h3>
              <p className="text-gray-600">
                Choose from our extensive collection of SUVs, Sedans, and Hatchbacks for any occasion
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Easy Online Booking</h3>
              <p className="text-gray-600">
                Book your car in just a few clicks. Simple, fast, and completely online
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden charges. See exactly what you pay before you confirm your booking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Cars</h3>
              <p className="text-gray-600">
                Explore our fleet and filter by type, price, and availability
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Pick Dates</h3>
              <p className="text-gray-600">
                Select your rental dates and see the total price calculated instantly
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Drive Away</h3>
              <p className="text-gray-600">
                Confirm your booking and enjoy your adventures on the road
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
