export default function LoggedInHome() {
    return (
      <main className="text-center mt-20">
        <h1 className="text-4xl font-bold">Welcome back to Tempely 👋</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Start generating viral hooks, posting smarter, and tracking your growth with AI.
        </p>
        <a href="/ai-tool">
          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition">
            Go to AI Dashboard
          </button>
        </a>
      </main>
    );
  }
  