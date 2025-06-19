import Image from 'next/image';

export default function TempelySpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-pulse">
      <Image
        src="/branding/tempely-spinner.png"
        alt="Loading..."
        width={60}
        height={60}
        className="animate-spin"
      />
      <p className="text-sm text-gray-500 mt-4">Generating magic... this may take 30–60 seconds ⏳</p>
    </div>
  );
}
