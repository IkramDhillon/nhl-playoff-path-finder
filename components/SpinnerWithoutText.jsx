'use client';

export default function Loader({
  spinnerMs = 1600,   // increase to spin slower
  showBackdrop = true // false = transparent background
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
      className={[
        "fixed inset-0 z-50 grid place-items-center antialiased text-white",
        showBackdrop
          ? "bg-gray-800 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
          : "bg-transparent"
      ].join(" ")}
    >
      {/* single outer spinner */}
      <div
        className="h-24 w-24 md:h-28 md:w-28 animate-spin rounded-full border-4 border-gray-600/60 border-t-cyan-400"
        style={{ animationDuration: `${spinnerMs}ms` }}
      />
    </div>
  );
}