'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    title: 'Hooked',
    category: 'Writing',
    image: '/screenshots/hooked-cover.png',
    link: '/products/hooked',
    description: 'Write viral-worthy hooks using proven formulas and scripts.',
  },
  {
    title: 'Posted',
    category: 'Planning',
    image: '/screenshots/posted-cover.png',
    link: '/products/posted',
    description: 'Plan content with clarity and avoid burnout with smart templates.',
  },
  {
    title: 'Tracked',
    category: 'Analytics',
    image: '/screenshots/tracked-cover.png',
    link: '/products/tracked',
    description: 'See what’s working, what’s not, and evolve your content strategy.',
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

        {/* Category Filter */}
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

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link
              href={product.link}
              key={product.title}
              className="group block transform transition duration-300 hover:scale-105"
            >
              <div className="rounded-xl overflow-hidden text-center">
                <Image
                  src={product.image}
                  alt={`${product.title} Cover`}
                  width={300}
                  height={180}
                  className="mx-auto rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-xl font-bold mt-4">{product.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
