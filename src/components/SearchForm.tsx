"use client";

export function SearchForm() {
  return (
    <form
      className="flex items-center gap-2 px-3 py-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <svg className="w-5 h-5 text-foreground-subtle flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="What do you want to learn? e.g. IELTS, spoken English..."
        className="flex-1 bg-transparent border-0 text-sm text-foreground placeholder-foreground-subtle focus:outline-none focus:ring-0 py-2"
        aria-label="What do you want to learn?"
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm px-4"
        disabled
      >
        Search
      </button>
    </form>
  );
}
