// client/src/pages/Wishlist.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductImage from '../components/ProductImage';
import StockLabel from '../components/StockLabel';

const primaryBtn = 'rounded-xl bg-brand-dark px-7 py-3 text-[15px] font-bold text-cream-light transition hover:bg-brand-darker';

function Wishlist() {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('loading');
    const [removing, setRemoving] = useState({});
    const navigate = useNavigate();

    const load = async () => {
        setStatus('loading');
        try {
            const res = await api.get('/wishlist');
            setItems(res.data.wishlist);
            setStatus('ready');
        } catch {
            setStatus('error');
        }
    };

    useEffect(() => { load(); }, []);

    const handleRemove = async (id) => {
        setRemoving((s) => ({ ...s, [id]: { busy: true } }));
        try {
            await api.delete(`/wishlist/${id}`);
            setItems((s) => s.filter((p) => p._id !== id));
            setRemoving((s) => ({ ...s, [id]: undefined }));
        } catch (err) {
            if (err.response?.status === 404) {
                setItems((s) => s.filter((p) => p._id !== id));
                setRemoving((s) => ({ ...s, [id]: undefined }));
            } else {
                setRemoving((s) => ({ ...s, [id]: { busy: false, error: err.response?.data?.message || 'Could not remove this item. Please try again.' } }));
            }
        }
    };

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[1100px] px-12 pb-16 pt-10">
                <h1 className="mb-1.5 text-[32px] font-extrabold">Your wishlist</h1>
                {status === 'ready' && (
                    <p className="mb-7 text-[15px] text-ink-muted">{items.length} {items.length === 1 ? 'saved item' : 'saved items'}</p>
                )}

                {status === 'loading' && (
                    <div role="status" className="pt-6">
                        <p className="mb-5 font-bold text-ink-muted">Loading your wishlist...</p>
                        <div className="flex flex-col gap-4">
                            {[0, 1, 2].map((i) => <div key={i} className="h-[132px] animate-pulse rounded-2xl bg-border-warm/50" />)}
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div role="alert" className="mt-6 flex flex-col items-center gap-4 rounded-[20px] border border-red-200 bg-red-50 px-6 py-14 text-center">
                        <div className="text-xl font-extrabold text-red-800">Unable to load wishlist.</div>
                        <button type="button" onClick={load} className={primaryBtn}>Try Again</button>
                    </div>
                )}

                {status === 'ready' && items.length === 0 && (
                    <div className="flex flex-col items-center gap-2.5 rounded-[20px] border-[1.5px] border-dashed border-border-warm px-6 py-[72px] text-center">
                        <div className="text-2xl font-extrabold">Your wishlist is empty ❤️</div>
                        <div className="mb-3.5 text-base text-ink-muted">Start saving products you love.</div>
                        <button type="button" onClick={() => navigate('/products')} className={primaryBtn}>Browse Products</button>
                    </div>
                )}

                {status === 'ready' && items.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {items.map((p) => {
                            const r = removing[p._id] || {};
                            return (
                                <div key={p._id} className="flex flex-wrap gap-5 rounded-2xl border border-border-warm bg-cream-light p-4">
                                    <ProductImage product={p} className="size-[132px] shrink-0 rounded-xl" />
                                    <div className="flex min-w-[200px] flex-1 flex-col gap-1.5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">{p.category}</div>
                                        <div className="text-lg font-bold">{p.name}</div>
                                        <div className="text-lg font-extrabold text-brand-dark">₹{p.price}</div>
                                        <StockLabel stock={p.stock} />
                                        {r.error && !r.busy && (
                                            <div role="alert" className="text-[13px] text-red-700">{r.error}</div>
                                        )}
                                    </div>
                                    <div className="flex min-w-[190px] flex-col justify-center gap-2.5">
                                        <Link to={`/products/${p._id}`} className="rounded-[10px] bg-brand-dark px-[18px] py-[11px] text-center text-sm font-bold text-cream-light transition hover:bg-brand-darker">
                                            View Details
                                        </Link>
                                        <button
                                            type="button"
                                            disabled={r.busy}
                                            onClick={() => handleRemove(p._id)}
                                            className="rounded-[10px] border-[1.5px] border-red-200 px-[18px] py-[11px] text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {r.busy ? 'Removing...' : 'Remove from Wishlist'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Wishlist;
