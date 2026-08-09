import { SearchIcon } from "@/components/ui/icons";

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" method="GET" role="search" className="flex max-w-md items-stretch">
      <label htmlFor="search-q" className="sr-only">
        Search products
      </label>
      <input
        id="search-q"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search products"
        className="border-border bg-input-bg text-text-primary placeholder:text-text-muted focus-visible:outline-accent-gold w-full border px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      />
      <button
        type="submit"
        aria-label="Search"
        className="border-border bg-btn-bg text-btn-text hover:bg-btn-bg-hover inline-flex w-12 shrink-0 items-center justify-center border border-l-0"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
