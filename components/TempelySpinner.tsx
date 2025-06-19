import Image from 'next/image';

export default function TempelySpinner() {
  return (
    <div className="animate-spin">
      <Image
        src="/branding/tempely-spinner.png"
        alt="Loading"
        width={20}
        height={20}
        className="opacity-80"
      />
    </div>
  );
}

