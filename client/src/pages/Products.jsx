// client/src/pages/Products.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const CATEGORIES = ['All Categories', 'Electronics', 'Fashion', 'Books', 'Home'];

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError('');
            try {
                const params = {};
                if (search) params.search = search;
                if (category !== 'All Categories') params.category = category;

                const res = await api.get('/products', { params });
                setProducts(res.data.products);
            } catch (err) {
                setError('Something went wrong while loading products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [search, category]);

    return (
        <div>
            <SearchBar value={search} onChange={setSearch} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {loading && <p>Loading products...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && products.length === 0 && <p>No products found.</p>}
            {!loading && !error && products.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {products.map((p) => <ProductCard key={p._id} product={p} />)}
                </div>
            )}
        </div>
    );
}

export default Products;
