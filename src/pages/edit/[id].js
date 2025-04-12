import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../lib/supabaseClient'; // Adjust the path if necessary
import '../../app/globals.css'; // Import global styles if needed

const EditWedding = () => {
  const router = useRouter();
  const { id } = router.query; // Get the wedding ID from the URL
  const [wedding, setWedding] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track error message

  // Fetch the wedding details when the component mounts or the ID changes
  useEffect(() => {
    if (id) {
      const fetchWedding = async () => {
        const { data, error } = await supabase
          .from('weddings')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching wedding:', error.message);
          setError(error.message); // Set error state
        } else {
          setWedding(data);
          setName(data.name); // Set the name value
          setDate(data.date); // Set the date value
          setLocation(data.location); // Set the location value
        }
      };

      fetchWedding();
    }
  }, [id]);

  // Handle form submission for editing wedding
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    const { error } = await supabase
      .from('weddings')
      .update({ name, date, location }) // Update name, date, and location
      .eq('id', id);

    if (error) {
      console.error('Error updating wedding:', error.message);
      setError(error.message); // Set error state
    } else {
      router.push('/dashboard'); // Redirect to the dashboard after successful update
    }

    setLoading(false);
  };

  if (!wedding) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center mb-6">Edit Wedding</h1>

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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWedding;
