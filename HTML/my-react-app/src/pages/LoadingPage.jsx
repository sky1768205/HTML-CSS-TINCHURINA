export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="mb-4 animate-spin">
          <img src="/images/LoadingImg.png" alt="loading" className="w-full" />
        </div>
      </div>
    </div>
  );
}
