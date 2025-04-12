import Link from 'next/link';

const Sidebar = ({ id, onLogout }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={`/manange-wedding/${id}`} className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                Weddings
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                Menu Management
              </Link>
            </li>
            <li>
              <Link
                href={`/manage-wedding/table-management/${id}`}
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Table Management
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                Kitchen Management
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md">
                Organiser Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="w-full py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
