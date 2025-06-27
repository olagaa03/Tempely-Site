'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    title: 'Hooked',
    image: '/screenshots/hooked-cover.png',
    description: 'Write viral-worthy hooks using proven formulas and scripts.',
    link: '/products/hooked',
    accent: 'blue',
  },
  {
    title: 'Posted',
    image: '/screenshots/posted-cover.png',
    description: 'Plan content with clarity and avoid burnout with smart templates.',
    link: '/products/posted',
    accent: 'purple',
  },
  {
    title: 'Tracked',
    image: '/screenshots/tracked-cover.png',
    description: "See what's working, what's not, and evolve your content strategy.",
    link: '/products/tracked',
    accent: 'yellow',
  },
];

const accentClass: Record<string, string> = {
  blue: 'group-hover:text-blue-400',
  purple: 'group-hover:text-purple-400',
  yellow: 'group-hover:text-yellow-400',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg">Explore Our Products</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((item) => (
          <Link href={item.link} key={item.title} className="group block transition duration-300 hover:scale-105">
            <div className="rounded-md overflow-hidden bg-white/10 backdrop-blur-md p-8 shadow-xl border border-white/10 hover:border-blue-500 hover:shadow-2xl transition flex flex-col items-center">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={180}
                className="mx-auto rounded-md transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className={`text-2xl font-bold mt-8 text-white transition ${accentClass[item.accent]}`}>{item.title}</h3>
              <p className="text-gray-300 mt-4 text-base font-medium text-center">{item.description}</p>
              <span className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-blue-500 transition-transform duration-200 hover:scale-105">View Product</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
