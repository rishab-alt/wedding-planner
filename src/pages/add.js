import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient'; // Adjust the path if necessary
import '../app/globals.css'; // Import global styles if needed

const AddWedding = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission for adding a wedding
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    const { error } = await supabase
      .from('weddings')
      .insert([{ name, date, location }]); // Insert wedding data into database

    if (error) {
      console.error('Error adding wedding:', error.message);
      setError(error.message); // Set error state
    } else {
      router.push('/dashboard'); // Redirect to the dashboard after successful submission
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center mb-6">Add Wedding</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error if any */}

        <form onSubmit={handleSubmit}>
          {/* Wedding Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Wedding Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Wedding Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Wedding Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Wedding Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700">Wedding Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {loading ? 'Adding...' : 'Add Wedding'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWedding;
