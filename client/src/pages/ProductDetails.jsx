// client/src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductImage from '../components/ProductImage';
import StockLabel from '../components/StockLabel';
import WishlistButton from '../components/WishlistButton';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Something went wrong while loading this product.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[1100px] px-12 pb-16 pt-8">
                <Link to="/products" className="mb-6 inline-block text-sm font-bold text-brand hover:text-brand-darker">
                    ← Back to products
                </Link>

                {loading && <p className="text-ink-muted">Loading product...</p>}
                {!loading && error && <p className="text-red-700">{error}</p>}
                {!loading && !error && product && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-12">
                        <ProductImage product={product} className="aspect-square w-full rounded-[20px]" />
                        <div className="flex flex-col gap-3">
                            <div className="text-[13px] font-bold uppercase tracking-wider text-ink-muted">{product.category}</div>
                            <h1 className="text-[34px] font-extrabold leading-tight">{product.name}</h1>
                            <div className="text-[26px] font-extrabold text-brand-dark">₹{product.price}</div>
                            <StockLabel stock={product.stock} />
                            <p className="max-w-[460px] text-base leading-relaxed text-ink-muted [text-wrap:pretty]">{product.description}</p>
                            <div className="mt-2 flex max-w-[320px] flex-col gap-2">
                                <WishlistButton productId={product._id} size="lg" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProductDetails;
