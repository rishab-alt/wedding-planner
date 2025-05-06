import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../lib/supabaseClient';

const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [starterOptions, setStarterOptions] = useState([]);
  const [mainOptions, setMainOptions] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);
  const [starter, setStarter] = useState('');
  const [main, setMain] = useState('');
  const [dessert, setDessert] = useState('');
  const [name, setName] = useState('');
  const [seatsRequired, setSeatsRequired] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  // Redirect to manage-wedding if no id in URL
  useEffect(() => {
    if (!id) {
      router.push('/manage-wedding');
    }
  }, [id, router]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setName(session.user.user_metadata.full_name || '');
      }

      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  // Fetch menu options for the selected wedding
  useEffect(() => {
    const fetchMenuOptions = async () => {
      if (!id) return;

      // Ensure the `id` is sanitized to remove any extraneous characters
      const sanitizedWeddingId = id.toString().replace(/[{}]/g, ''); 

      const { data, error } = await supabase
        .from('menu_options')
        .select('course, item')
        .eq('wedding_id', sanitizedWeddingId);  // Use wedding_id here

      if (error) {
        console.error('Error fetching menu options:', error);
        return;
      }

      // Group items by course
      const starters = [];
      const mains = [];
      const desserts = [];

      data.forEach(({ course, item }) => {
        if (course === 'starter') starters.push(item);
        else if (course === 'main') mains.push(item);
        else if (course === 'dessert') desserts.push(item);
      });

      setStarterOptions(starters);
      setMainOptions(mains);
      setDessertOptions(desserts);
    };

    fetchMenuOptions();
  }, [id]);

  // Handle form submission
  const handleRSVPSubmit = async (e) => {
    e.preventDefault();

    if (!starter || !main || !dessert || !seatsRequired) {
      setError('Please fill in all the fields');
      return;
    }

    const sanitizedUserId = user.id?.replace(/[{}]/g, '');
    const sanitizedWeddingId = id?.toString().replace(/[{}]/g, '');

    try {
      const { data, error } = await supabase.from('user_responses').insert([{
        user_id: sanitizedUserId,
        wedding_id: sanitizedWeddingId,
        name,
        starter,
        main,
        dessert,
        seats_required: seatsRequired,
      }]);


      if (error) {
        throw error;
      }

      alert('RSVP submitted successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting RSVP:', error.message);
      setError('There was an error submitting your response');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">RSVP for Wedding</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleRSVPSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Dynamic Starter Options */}
          <div>
            <label htmlFor="starter" className="block text-lg font-semibold">Starter:</label>
            <select
              id="starter"
              value={starter}
              onChange={(e) => setStarter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Starter</option>
              {starterOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Main Options */}
          <div>
            <label htmlFor="main" className="block text-lg font-semibold">Main:</label>
            <select
              id="main"
              value={main}
              onChange={(e) => setMain(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Main</option>
              {mainOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Dessert Options */}
          <div>
            <label htmlFor="dessert" className="block text-lg font-semibold">Dessert:</label>
            <select
              id="dessert"
              value={dessert}
              onChange={(e) => setDessert(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Dessert</option>
              {dessertOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Seats Input */}
          <div>
            <label htmlFor="seatsRequired" className="block text-lg font-semibold">Seats Required:</label>
            <input
              id="seatsRequired"
              type="number"
              value={seatsRequired}
              onChange={(e) => setSeatsRequired(Math.min(10, Math.max(1, e.target.value)))}
              min="1"
              max="10"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
