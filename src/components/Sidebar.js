// components/Sidebar.js

import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ handleLogout }) => {
  const router = useRouter();

  return (
    <div className="w-1/4 bg-gray-800 text-white flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Weddings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Menu Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Table Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
                Kitchen Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg py-2 hover:bg-gray-700 px-4 block rounded-md"
              >
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
  );
};

export default Sidebar;
