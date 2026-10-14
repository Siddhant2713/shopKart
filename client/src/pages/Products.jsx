// client/src/pages/Products.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
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
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[1280px] px-12 pb-16 pt-10">
                <h1 className="mb-1.5 text-[32px] font-extrabold">All products</h1>
                <p className="mb-7 text-[15px] text-ink-muted">
                    {!loading && !error ? `${products.length} ${products.length === 1 ? 'product' : 'products'}` : ' '}
                </p>

                <div className="mb-7 flex flex-wrap gap-3">
                    <SearchBar value={search} onChange={setSearch} />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-[10px] border-[1.5px] border-border-warm bg-cream-light px-4 py-2.5 text-sm text-ink outline-none focus:border-brand"
                    >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {loading && <p className="text-ink-muted">Loading products...</p>}
                {!loading && error && <p className="text-red-700">{error}</p>}
                {!loading && !error && products.length === 0 && <p className="text-ink-muted">No products found.</p>}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
                        {products.map((p) => <ProductCard key={p._id} product={p} />)}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Products;
