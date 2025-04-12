import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient'; // Adjust the import according to your project structure

export default function CreateWedding() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !location) {
      console.log('All fields must be filled.');
      return;
    }

    setLoading(true);

    // Insert wedding data into Supabase
    const { data, error } = await supabase
      .from('weddings')
      .insert([{ name, date, location }]);

    if (error) {
      console.error('Error inserting wedding:', error.message);
      setLoading(false);
      return;
    }

    console.log('Wedding inserted:', data);

    // Redirect to dashboard after successful submission
    router.push('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Create New Wedding</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Wedding Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium">Wedding Date</label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">Location</label>
          <input
            type="text"
            id="location"
            className="w-full px-4 py-2 border rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Wedding'}
        </button>
      </form>
    </div>
  );
}
