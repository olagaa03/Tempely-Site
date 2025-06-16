export default function Posted() {
    return (
      <main className="min-h-screen bg-white text-gray-900 font-sans py-16 px-4">
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/screenshots/posted-cover.png" 
              alt="Posted product preview" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">Posted.</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Posted. is your all-in-one content HQ — a Notion dashboard designed to help you <strong>plan, organize, script, and repurpose</strong> your ideas with clarity and speed.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>A <strong>30-Day Content Planner</strong> to map out your strategy in advance</li>
              <li>A <strong>Hook Bank</strong> to connect with high-performing hooks from <em>Hooked.</em></li>
              <li>A <strong>Recycling Tracker</strong> to resurface and republish your best posts</li>
              <li>Smart columns for <strong>status, scripts, platforms, performance</strong>, and more</li>
              <li>Built to reduce overwhelm — and help you post with purpose</li>
            </ul>
            <p className="mt-6 text-gray-600">
              Use it to stay consistent, think clearly, and publish without stress.
            </p>
            <a
              href="https://your-buy-link.com"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Buy Posted. for $14.99
            </a>
          </div>
        </section>
  
        <section className="w-full mt-20 px-4 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get the Creator Bundle</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Buy <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> together in one powerful bundle — and save while you're at it.
          </p>
          <a
            href="/#bundle"
            className="inline-block bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold shadow hover:opacity-90 transition"
          >
            Buy the Bundle
          </a>
        </section>
  
        <section className="w-full mt-24 px-4 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What creators are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-2xl p-6 shadow-md">
              <p className="text-gray-700 italic text-sm">
                “Posted is the first content planner I actually stick to – clean and super practical.”
              </p>
              <p className="mt-4 font-medium text-gray-900 text-sm">— Jamie, Content Coach</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 shadow-md">
              <p className="text-gray-700 italic text-sm">
                “Hooked helped me finally go viral. The categories and examples are gold.”
              </p>
              <p className="mt-4 font-medium text-gray-900 text-sm">— Alex, Copywriter</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 shadow-md">
              <p className="text-gray-700 italic text-sm">
                “Tracked showed me what actually works. My content is finally data-driven.”
              </p>
              <p className="mt-4 font-medium text-gray-900 text-sm">— Sam, Creator</p>
            </div>
          </div>
        </section>
  
        <footer className="w-full text-center text-gray-500 text-sm mt-20">
          <p>&copy; 2025 Templa. All rights reserved.</p>
        </footer>
      </main>
    );
  }
  