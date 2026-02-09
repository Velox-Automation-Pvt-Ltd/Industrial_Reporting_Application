export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404 😢</h1>
      <p className="text-gray-700 mb-6">Oops! The page you're looking for doesn’t exist.</p>
      <a
        href="/app"
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
      >
        Go Home
      </a>
    </div>
  );
}
