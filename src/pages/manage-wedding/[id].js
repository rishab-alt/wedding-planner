import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import '../../app/globals.css'; // Import global styles if needed

const ManageWedding = () => {
  const [wedding, setWedding] = useState(null);
  const [responses, setResponses] = useState([]); // State for storing responses
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic id from the URL

  useEffect(() => {
    const fetchWeddingData = async () => {
      if (!id) return; // Wait for the ID to be available

      // Fetch wedding data
      const { data: weddingData, error: weddingError } = await supabase
        .from('weddings')
        .select('*')
        .eq('id', id)
        .single(); // Fetch wedding data for the given ID

      if (weddingError) {
        console.error('Error fetching wedding:', weddingError.message);
      } else {
        setWedding(weddingData);
      }

      // Fetch responses related to the wedding
      const { data: responsesData, error: responsesError } = await supabase
        .from('user_responses')
        .select('*')
        .eq('', id); // Fetch responses related to this wedding

      if (responsesError) {
        console.error('Error fetching responses:', responsesError.message);
      } else {
        setResponses(responsesData);
      }

      setLoading(false);
    };

    fetchWeddingData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wedding) {
    return <div>Wedding not found.</div>;
  }

  // Logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-semibold mb-8">Admin Dashboard</h1>
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Weddings
                </a>
              </li>
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Menu Management
                </a>
              </li>
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Table Management
                </a>
              </li>
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Kitchen Management
                </a>
              </li>
              <li>
                <a href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                  Organiser Management
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Manage Wedding</h2>
          <p className="text-gray-600 mt-2">Details for the selected wedding:</p>
        </div>

        {/* Wedding Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold">{wedding.name}</h2>
          <p className="text-gray-600">Date: {wedding.date}</p>
          <p className="text-gray-600">Location: {wedding.location}</p>
          <p className="text-gray-600">User ID: {wedding.user_id}</p>
        </div>

        {/* Button to go to RSVP form */}
        <div>
          <button
            onClick={() => router.push(`/rsvp/${id}}`)} // Redirect to RSVP form for this wedding
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to RSVP Form
          </button>
        </div>

        {/* Responses Table */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-lg font-semibold mb-4">RSVP Responses</h3>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Starter</th>
                <th className="px-4 py-2 border border-gray-300">Main</th>
                <th className="px-4 py-2 border border-gray-300">Dessert</th>
              </tr>
            </thead>
            <tbody>
              {responses.length > 0 ? (
                responses.map((response) => (
                  <tr key={response.id}>
                    <td className="px-4 py-2 border border-gray-300">{response.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{response.starter}</td>
                    <td className="px-4 py-2 border border-gray-300">{response.main}</td>
                    <td className="px-4 py-2 border border-gray-300">{response.dessert}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">
                    No responses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageWedding;
