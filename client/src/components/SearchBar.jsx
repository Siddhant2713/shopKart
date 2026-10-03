// client/src/components/SearchBar.jsx
function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;
