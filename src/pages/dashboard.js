import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import '../app/globals.css'; // Import global styles if needed



const Dashboard = () => {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch weddings from Supabase
  useEffect(() => {
    const fetchWeddings = async () => {
      const { data, error } = await supabase
        .from('weddings')
        .select('*'); // Fetch all columns from the weddings table

      if (error) {
        console.error('Error fetching weddings:', error.message);
      } else {
        setWeddings(data);
      }

      setLoading(false);
    };

    fetchWeddings();
  }, []);

  // Logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Redirect to login page after logout
  };

  // Delete wedding functionality
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('weddings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting wedding:', error.message);
    } else {
      setWeddings(weddings.filter((wedding) => wedding.id !== id)); // Remove the wedding from the state
    }
  };

  // Redirect to the dynamic wedding page with the wedding id
  const handleManageWedding = (id) => {
    router.push(`/manage-wedding/${id}`); // Redirect to the dynamic page
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
          <h2 className="text-2xl font-semibold">Welcome, Admin!</h2>
          <p className="text-gray-600 mt-2">Here is a list of all the weddings:</p>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {weddings.map((wedding) => (
              <div key={wedding.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{wedding.name}</h2>
                <p className="text-gray-600">{wedding.date}</p>
                <p className="text-gray-600">{wedding.location}</p>
                <p className="text-gray-600">User ID: {wedding.user_id}</p>

                <div className="mt-4 space-x-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleManageWedding(wedding.id)}
                    className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Manage Wedding
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(wedding.id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
