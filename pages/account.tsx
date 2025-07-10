export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto pt-16 pb-20">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">Your Account</h1>
      <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-lg flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow mb-2 border border-gray-200">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" fill="#7f5af0"/></svg>
          </div>
          <span className="font-bold text-xl text-gray-900">Your Name</span>
          <span className="text-gray-400 text-base">your@email.com</span>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-col gap-2">
            <span className="font-bold text-purple-600 text-lg mb-1">Profile Settings</span>
            <button className="btn-premium w-full">Edit Profile</button>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-col gap-2">
            <span className="font-bold text-blue-600 text-lg mb-1">Subscription</span>
            <button className="btn-premium w-full">Manage Subscription</button>
          </div>
        </div>
      </div>
    </div>
  );
} 