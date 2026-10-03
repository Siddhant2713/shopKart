import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);
        try {
            await api.post('/customers/login', { email, password });
            navigate('/home');
        } catch (err) {
            setError('Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-svh">
            {/* Brand panel */}
            <div className="hidden min-w-[320px] flex-1 flex-col justify-between bg-brand p-14 text-cream-light md:flex">
                <Link to="/" className="text-[28px] font-extrabold tracking-tight">
                    shotkart
                </Link>

                <div className="max-w-[380px]">
                    <h1 className="mb-4 text-[40px] font-extrabold leading-[1.15]">
                        Everything you need, in one cart.
                    </h1>
                    <p className="text-[17px] leading-relaxed opacity-90">
                        Log in to pick up where you left off — orders, wishlists, and
                        saved carts, all waiting for you.
                    </p>
                </div>

                <p className="text-sm opacity-75">&copy; 2026 Shotkart</p>
            </div>

            {/* Form panel */}
            <div className="flex flex-[1.1] items-center justify-center bg-cream-light p-12">
                <form onSubmit={handleSubmit} className="w-full max-w-[380px]">
                    <h2 className="mb-2 text-[30px] font-extrabold text-ink">Welcome back</h2>
                    <p className="mb-8 text-[15px] text-ink-muted">
                        Log in to your Shotkart account
                    </p>

                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <label className="mb-1.5 block text-sm font-bold text-ink">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-[18px] block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <label className="mb-1.5 block text-sm font-bold text-ink">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-2.5 block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <div className="mb-[26px] flex justify-end">
                        <a href="#" className="text-sm font-semibold text-brand hover:text-brand-darker">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-brand-dark py-3.5 text-base font-bold text-cream-light transition hover:bg-brand-darker disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>

                    <div className="mt-6 text-center text-[15px] text-ink-muted">
                        New to Shotkart?{' '}
                        <Link to="/register" className="font-bold text-brand hover:text-brand-darker">
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
