import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../../lib/supabaseClient';
import '../../../app/globals.css'; // Import global styles if needed

const ManageMenu = () => {
  const router = useRouter();
  const { id } = router.query;

  const [menu, setMenu] = useState({ starter: [], main: [], dessert: [] });
  const [newItem, setNewItem] = useState({ course: 'starter', item: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    const { data, error } = await supabase
      .from('menu_options')
      .select('*')
      .eq('wedding_id', id);

    if (error) {
      setError('Error fetching menu');
      console.error(error);
      return;
    }

    const grouped = { starter: [], main: [], dessert: [] };
    data.forEach((entry) => {
      if (grouped[entry.course]) {
        grouped[entry.course].push(entry);
      }
    });

    setMenu(grouped);
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchMenu();
  }, [id]);

  const handleAddItem = async () => {
    if (!newItem.item) return;

    const { data, error } = await supabase.from('menu_options').insert([
      {
        wedding_id: id,
        course: newItem.course,
        item: newItem.item,
      },
    ]);

    if (error) {
      setError('Error adding item');
      console.error(error);
      return;
    }

    setNewItem({ course: 'starter', item: '' });
    fetchMenu();
  };

  const handleDeleteItem = async (itemId) => {
    const { error } = await supabase.from('menu_options').delete().eq('id', itemId);
    if (error) {
      setError('Error deleting item');
      console.error(error);
      return;
    }
    fetchMenu();
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Wedding Menu</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Menu Item</h2>
        <div className="flex gap-2">
          <select
            value={newItem.course}
            onChange={(e) => setNewItem({ ...newItem, course: e.target.value })}
            className="border p-2 rounded w-1/3"
          >
            <option value="starter">Starter</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
          </select>
          <input
            type="text"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            placeholder="Enter item name"
            className="border p-2 rounded w-1/2"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {['starter', 'main', 'dessert'].map((course) => (
        <div key={course} className="mb-6">
          <h2 className="text-2xl font-semibold capitalize mb-2">{course}s</h2>
          {menu[course].length === 0 ? (
            <p className="text-gray-500">No items added yet.</p>
          ) : (
            <ul className="space-y-2">
              {menu[course].map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{item.item}</span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageMenu;
