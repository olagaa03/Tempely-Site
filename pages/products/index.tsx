import { useState } from 'react';
import Link from 'next/link';

const products = [
  {
    title: 'Hooked.',
    category: 'Writing',
    image: '/screenshots/hooked-cover.png',
    link: '/products/hooked', // ✅ was just '/hooked'
  },
  {
    title: 'Posted.',
    category: 'Planning',
    image: '/screenshots/posted-cover.png',
    link: '/products/posted', // ✅
  },
  {
    title: 'Tracked.',
    category: 'Analytics',
    image: '/screenshots/tracked-cover.png',
    link: '/products/tracked', // ✅
  },
];


const categories = ['All', 'Writing', 'Planning', 'Analytics'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12 font-sans">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">All Templates</h1>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition text-sm font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link
              href={product.link}
              key={product.title}
              className="group transform transition duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title + ' Cover'}
                  className="w-full h-auto"
                />
                <div className="p-4 text-center font-semibold">{product.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
