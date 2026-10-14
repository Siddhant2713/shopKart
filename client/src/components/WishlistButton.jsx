// client/src/components/WishlistButton.jsx
import { useState } from 'react';
import api from '../services/api';

const SIZES = {
    sm: 'rounded-[10px] p-[11px] text-sm',
    lg: 'rounded-xl p-3.5 text-[15px]',
};

function WishlistButton({ productId, size = 'sm' }) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const base = `w-full border-[1.5px] font-bold ${SIZES[size]}`;

    const handleAdd = async () => {
        if (status === 'saving') return;
        setStatus('saving');
        setError('');
        try {
            await api.post(`/wishlist/${productId}`);
            setStatus('added');
        } catch (err) {
            if (err.response?.status === 409) {
                setStatus('added');
            } else {
                setStatus('error');
                setError(err.response?.data?.message || 'Could not add to wishlist. Please try again.');
            }
        }
    };

    if (status === 'saving') {
        return (
            <button type="button" disabled aria-busy="true" className={`${base} cursor-not-allowed border-border-warm bg-cream text-ink-muted`}>
                ⏳ Saving...
            </button>
        );
    }

    if (status === 'added') {
        return (
            <button type="button" disabled className={`${base} cursor-default border-brand-dark bg-brand-dark text-cream-light`}>
                ♥ Added to Wishlist
            </button>
        );
    }

    return (
        <>
            <button type="button" onClick={handleAdd} className={`${base} border-brand-dark bg-transparent text-brand-dark transition hover:bg-brand-dark hover:text-cream-light`}>
                ♡ Add to Wishlist
            </button>
            {status === 'error' && (
                <div role="alert" className="mt-2 rounded-lg bg-red-50 px-2.5 py-2 text-[13px] leading-snug text-red-700">{error}</div>
            )}
        </>
    );
}

export default WishlistButton;
