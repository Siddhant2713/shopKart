// client/src/components/SearchBar.jsx
function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full max-w-[320px] rounded-[10px] border-[1.5px] border-border-warm bg-cream-light px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-brand"
        />
    );
}

export default SearchBar;
