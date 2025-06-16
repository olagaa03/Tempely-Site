import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-sm text-gray-700 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p>
          &copy; {year} Templa. All rights reserved. |{' '}
          <a href="/about" className="text-blue-600 hover:underline">
            About
          </a>
        </p>
      </div>
    </footer>
  );
}
