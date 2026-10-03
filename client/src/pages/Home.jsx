import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/customers/me');
                setUser(res.data);
            } catch (err) {
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex min-h-svh items-center justify-center bg-cream">
                <p className="text-sm text-ink-muted">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-cream">
            <Navbar />

            <section
                className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-16 bg-gold px-12 py-20"
            >
                <div className="min-w-[320px] flex-1">
                    <h1 className="mb-5 text-[52px] font-extrabold leading-[1.1] text-gold-ink">
                        Welcome back, {user.fullName.split(' ')[0]} 👋
                    </h1>
                    <p className="mb-8 max-w-[420px] text-lg leading-relaxed text-gold-ink-muted">
                        Great to see you again. Your cart, orders, and saved items are
                        right where you left them.
                    </p>
                    <button className="rounded-xl bg-brand-dark px-8 py-3.5 text-base font-bold text-cream-light transition hover:bg-brand-darker">
                        Start shopping
                    </button>
                </div>

                <div className="min-w-[320px] flex-1">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[20px] bg-[repeating-linear-gradient(135deg,var(--color-gold-light)_0px,var(--color-gold-light)_14px,var(--color-gold-lighter)_14px,var(--color-gold-lighter)_28px)]">
                        <span className="rounded-md bg-cream-light/70 px-3.5 py-1.5 font-mono text-[13px] text-gold-ink-muted">
                            hero product photography
                        </span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1280px] px-12 py-16">
                <h2 className="mb-6 text-2xl font-extrabold text-ink">Your account</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border-warm bg-cream-light p-6">
                        <p className="text-sm font-bold text-ink-muted">Full name</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">{user.fullName}</p>
                    </div>
                    <div className="rounded-2xl border border-border-warm bg-cream-light p-6">
                        <p className="text-sm font-bold text-ink-muted">Email</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">{user.email}</p>
                    </div>
                    <div className="rounded-2xl border border-border-warm bg-cream-light p-6 sm:col-span-2">
                        <p className="text-sm font-bold text-ink-muted">Phone</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">{user.phone}</p>
                    </div>
                </div>
            </section>

            <footer className="px-8 py-8 text-center text-sm text-ink-muted">
                &copy; 2026 Shotkart. All rights reserved.
            </footer>
        </div>
    );
}

export default Home;
