export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">⚠️ {message}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
          >
            Coba lagi
          </button>
        ) : null}
      </div>
    </div>
  );
}
