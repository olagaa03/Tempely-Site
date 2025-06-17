export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-neutral-600 text-sm mt-12 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="font-semibold text-neutral-800">Tempely</p>
          <p className="mt-1">Operated by Tempely Gaarden, registered in Norway.</p>
          <p>All rights reserved © Tempely 2025</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-neutral-500 underline text-sm">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/refund">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
