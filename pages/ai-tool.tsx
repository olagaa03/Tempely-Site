import { useState } from 'react';

export default function AiProPage() {
  const [formData, setFormData] = useState({
    niche: '',
    platform: '',
    audience: '',
    tone: '',
    goal: '',
    product: '',
    pain: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setError('');

    try {
      const res = await fetch('/api/generate-pro-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to reach server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Unlock premium content creation powered by GPT-4 ✨
      </h1>
      <p className="text-center text-gray-600 mb-8 italic">
        Tailored <strong>content</strong>, <strong>hooks</strong>, and <strong>captions</strong> crafted for your brand.
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        {[
          { label: '📌 Enter your niche*', name: 'niche' },
          { label: '📱 Enter your platform*', name: 'platform' },
          { label: '🎯 Enter your audience*', name: 'audience' },
          { label: '🎭 Enter your tone*', name: 'tone' },
          { label: '🏁 Enter your goal*', name: 'goal' },
        ].map(({ label, name }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={label}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        ))}

        <input
          type="text"
          name="product"
          placeholder="💡 Product or offer (optional)"
          value={formData.product}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <textarea
          name="pain"
          placeholder="😫 Customer pain points or struggles (optional)"
          value={formData.pain}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? 'Generating...' : 'Generate AI Content'}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {result && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Your AI Content:</h2>
          {result}
        </div>
      )}
    </main>
  );
}
