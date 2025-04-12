'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Wedding Planner</h1>
      <p className="mt-4 text-lg text-gray-600">Plan the perfect event with ease and elegance.</p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
