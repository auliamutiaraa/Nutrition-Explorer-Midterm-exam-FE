export default function LoadingSpinner({ label = "Mengambil data nutrisi..." }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-leaf-200 bg-white/70 p-8 text-center dark:border-slate-700 dark:bg-slate-900/70">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-leaf-100 border-t-leaf-600" />
      <p className="font-medium text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}
