import { useState, useRef } from 'react';
import { Loader, Image as ImageIcon, Film, ArrowUpRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const TABS = [
  { id: 'text-to-image', label: 'Text to Image' },
  { id: 'image-to-video', label: 'Image to Video' },
  { id: 'upscale-video', label: 'Upscale Video' },
];

export default function VisualLab() {
  const [tab, setTab] = useState('text-to-image');

  // Text to Image
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgResult, setImgResult] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgError, setImgError] = useState('');

  // Image to Video
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoImage, setVideoImage] = useState<File | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState('');
  const videoImageInput = useRef<HTMLInputElement>(null);

  // Upscale Video
  const [upscaleFile, setUpscaleFile] = useState<File | null>(null);
  const [upscaleResult, setUpscaleResult] = useState<string | null>(null);
  const [upscaleLoading, setUpscaleLoading] = useState(false);
  const [upscaleError, setUpscaleError] = useState('');
  const upscaleInput = useRef<HTMLInputElement>(null);

  // --- API Calls ---
  async function handleTextToImage() {
    setImgError('');
    setImgResult(null);
    setImgLoading(true);
    try {
      const res = await fetch('/api/runway-text-to-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imgPrompt }),
      });
      if (!res.ok) throw new Error('Failed to generate image');
      const data = await res.json();
      setImgResult(data.imageUrl);
      toast.success('Image generated!');
    } catch (err: any) {
      setImgError(err.message || 'Failed to generate image.');
      toast.error('Failed to generate image.');
    } finally {
      setImgLoading(false);
    }
  }

  async function handleImageToVideo() {
    setVideoError('');
    setVideoResult(null);
    setVideoLoading(true);
    try {
      if (!videoImage) throw new Error('Please upload an image.');
      // Upload image to get a URL (use a temp file host or your own API)
      const formData = new FormData();
      formData.append('file', videoImage);
      const uploadRes = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Failed to upload image.');
      const { url: imageUrl } = await uploadRes.json();
      // Call RunwayML image_to_video
      const res = await fetch('/api/runway-image-to-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptImage: imageUrl, promptText: videoPrompt }),
      });
      if (!res.ok) throw new Error('Failed to generate video');
      const data = await res.json();
      setVideoResult(data.videoUrl);
      toast.success('Video generated!');
    } catch (err: any) {
      setVideoError(err.message || 'Failed to generate video.');
      toast.error('Failed to generate video.');
    } finally {
      setVideoLoading(false);
    }
  }

  async function handleUpscaleVideo() {
    setUpscaleError('');
    setUpscaleResult(null);
    setUpscaleLoading(true);
    try {
      if (!upscaleFile) throw new Error('Please upload a video.');
      // Upload video to get a URL (use a temp file host or your own API)
      const formData = new FormData();
      formData.append('file', upscaleFile);
      const uploadRes = await fetch('/api/upload-video', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Failed to upload video.');
      const { url: videoUrl } = await uploadRes.json();
      // Call RunwayML upscale endpoint
      const res = await fetch('/api/runway-upscale-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });
      if (!res.ok) throw new Error('Failed to upscale video');
      const data = await res.json();
      setUpscaleResult(data.upscaledUrl);
      toast.success('Video upscaled!');
    } catch (err: any) {
      setUpscaleError(err.message || 'Failed to upscale video.');
      toast.error('Failed to upscale video.');
    } finally {
      setUpscaleLoading(false);
    }
  }

  // --- UI ---
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">AI Visual Lab</h1>
        <p className="text-neutral-500 mb-8">Generate images from text, create videos from images, or upscale your videos—all in one place.</p>
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-full font-semibold border transition-all ${tab === t.id ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          {tab === 'text-to-image' && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Text to Image</h2>
              <label className="block mb-2 font-medium">Prompt</label>
              <input
                value={imgPrompt}
                onChange={e => setImgPrompt(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-3 mb-4 focus:outline-none focus:border-neutral-400"
                placeholder="Describe your image..."
              />
              <button
                onClick={handleTextToImage}
                disabled={imgLoading || !imgPrompt.trim()}
                className="w-full py-3 rounded-lg font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-60 mb-4"
              >
                {imgLoading ? <Loader className="w-5 h-5 animate-spin inline-block mr-2" /> : null}
                Generate Image
              </button>
              {imgError && <div className="text-red-500 mb-2">{imgError}</div>}
              {imgResult && (
                <div className="mt-4"><img src={imgResult} alt="Generated" className="rounded-lg border w-full max-h-96 object-contain" /></div>
              )}
            </section>
          )}
          {tab === 'image-to-video' && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Film className="w-5 h-5" /> Image to Video</h2>
              <label className="block mb-2 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                ref={videoImageInput}
                onChange={e => setVideoImage(e.target.files?.[0] || null)}
                className="mb-4"
              />
              <label className="block mb-2 font-medium">Prompt (optional)</label>
              <input
                value={videoPrompt}
                onChange={e => setVideoPrompt(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-3 mb-4 focus:outline-none focus:border-neutral-400"
                placeholder="Describe the video transformation..."
              />
              <button
                onClick={handleImageToVideo}
                disabled={videoLoading || !videoImage}
                className="w-full py-3 rounded-lg font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-60 mb-4"
              >
                {videoLoading ? <Loader className="w-5 h-5 animate-spin inline-block mr-2" /> : null}
                Generate Video
              </button>
              {videoError && <div className="text-red-500 mb-2">{videoError}</div>}
              {videoResult && (
                <div className="mt-4"><video src={videoResult} controls className="rounded-lg border w-full max-h-96 object-contain" /></div>
              )}
            </section>
          )}
          {tab === 'upscale-video' && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ArrowUpRight className="w-5 h-5" /> Upscale Video</h2>
              <label className="block mb-2 font-medium">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                ref={upscaleInput}
                onChange={e => setUpscaleFile(e.target.files?.[0] || null)}
                className="mb-4"
              />
              <button
                onClick={handleUpscaleVideo}
                disabled={upscaleLoading || !upscaleFile}
                className="w-full py-3 rounded-lg font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all disabled:opacity-60 mb-4"
              >
                {upscaleLoading ? <Loader className="w-5 h-5 animate-spin inline-block mr-2" /> : null}
                Upscale Video
              </button>
              {upscaleError && <div className="text-red-500 mb-2">{upscaleError}</div>}
              {upscaleResult && (
                <div className="mt-4"><video src={upscaleResult} controls className="rounded-lg border w-full max-h-96 object-contain" /></div>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
} 