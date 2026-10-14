import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [featured, setFeatured] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/customers/me');
                setUser(res.data);
            } catch {
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    useEffect(() => {
        api.get('/products')
            .then((res) => setFeatured(res.data.products.slice(0, 4)))
            .catch(() => {});
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-svh items-center justify-center bg-cream">
                <p className="text-sm text-ink-muted">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />

            <section className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-16 bg-gold px-12 py-20">
                <div className="min-w-[320px] flex-1">
                    <p className="mb-3 text-base font-bold text-gold-ink-muted">
                        Hi {user.fullName.split(' ')[0]} 👋
                    </p>
                    <h1 className="mb-5 text-[52px] font-extrabold leading-[1.1] text-gold-ink">
                        Everything you need,<br />all in one cart.
                    </h1>
                    <p className="mb-8 max-w-[420px] text-lg leading-relaxed text-gold-ink-muted">
                        From everyday essentials to things you didn't know you needed — shop it all
                        in one place, delivered fast.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="rounded-xl bg-brand-dark px-8 py-3.5 text-base font-bold text-cream-light transition hover:bg-brand-darker"
                    >
                        Start shopping
                    </button>
                </div>

                <div className="min-w-[320px] flex-1">
                    <img
                        src="/hero.svg"
                        alt="Shopping bag, gift box and saved items"
                        className="aspect-[4/3] w-full rounded-[20px] object-cover"
                    />
                </div>
            </section>

            {featured.length > 0 && (
                <section className="mx-auto max-w-[1280px] px-12 py-16">
                    <div className="mb-6 flex items-baseline justify-between">
                        <h2 className="text-2xl font-extrabold">Featured products</h2>
                        <Link to="/products" className="text-sm font-bold text-brand hover:text-brand-darker">
                            View all →
                        </Link>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
                        {featured.map((p) => <ProductCard key={p._id} product={p} />)}
                    </div>
                </section>
            )}

            <footer className="px-8 py-8 text-center text-sm text-ink-muted">
                &copy; 2026 Shotkart. All rights reserved.
            </footer>
        </div>
    );
}

export default Home;
