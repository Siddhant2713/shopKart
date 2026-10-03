import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!fullName || !email || !password || !phone) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            await api.post('/customers/register', { fullName, email, password, phone });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                        Join thousands of happy shoppers.
                    </h1>
                    <p className="text-[17px] leading-relaxed opacity-90">
                        Create your account to start tracking orders, saving
                        favorites, and checking out faster.
                    </p>
                </div>

                <p className="text-sm opacity-75">&copy; 2026 Shotkart</p>
            </div>

            {/* Form panel */}
            <div className="flex flex-[1.1] items-center justify-center bg-cream-light p-12">
                <form onSubmit={handleSubmit} className="w-full max-w-[380px]">
                    <h2 className="mb-2 text-[30px] font-extrabold text-ink">
                        Create your account
                    </h2>
                    <p className="mb-7 text-[15px] text-ink-muted">It only takes a minute</p>

                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <label className="mb-1.5 block text-sm font-bold text-ink">Full name</label>
                    <input
                        type="text"
                        placeholder="Jamie Rivera"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mb-4 block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <label className="mb-1.5 block text-sm font-bold text-ink">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <label className="mb-1.5 block text-sm font-bold text-ink">Phone number</label>
                    <input
                        type="tel"
                        placeholder="+1 555 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mb-4 block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <label className="mb-1.5 block text-sm font-bold text-ink">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-[26px] block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-brand-dark py-3.5 text-base font-bold text-cream-light transition hover:bg-brand-darker disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>

                    <div className="mt-6 text-center text-[15px] text-ink-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-brand hover:text-brand-darker">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
