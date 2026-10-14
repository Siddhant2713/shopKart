// client/src/components/Navbar.jsx

import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
// import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';


function Navbar() {
    const navigate = useNavigate();
    // const { savedIds } = useWishlist();
    const { itemCount } = useCart();


    const handleLogout = async () => {
        await api.post('/customers/logout');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-10 flex items-center gap-8 border-b border-border-warm bg-cream-light px-12 py-4.5">
            <Link to="/home" className="text-2xl font-extrabold tracking-tight text-brand-dark">
                shotkart
            </Link>

            <div className="flex max-w-[520px] flex-1 items-center gap-2.5 rounded-[10px] bg-cream px-4 py-2.5">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-ink-muted"
                >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-6">

                <Link to="/products" className="text-sm font-bold text-ink">
                    Products
                </Link>

                <Link to="/wishlist" className="flex items-center gap-1.5 text-sm font-bold text-ink hover:text-brand-dark">
                    <span className="text-base text-brand">♥</span>
                    Wishlist
                    
                </Link>
                <Link to="/cart" className="flex items-center gap-1.5 text-sm font-bold text-ink hover:text-brand-dark">
                    Cart
                    {itemCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-dark px-1.5 text-xs text-cream-light">{itemCount}</span>
                    )}
                </Link>
                <Link to="/orders" className="text-sm font-bold text-ink">Orders</Link>



                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-bold text-ink"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Logout
                </button>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-ink"
                >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            </div>
        </header>
    );
}

export default Navbar;
