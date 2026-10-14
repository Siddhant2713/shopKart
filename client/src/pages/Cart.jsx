// client/src/pages/Cart.jsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ProductImage from '../components/ProductImage';

const primaryBtn = 'rounded-xl bg-brand-dark px-7 py-3 text-[15px] font-bold text-cream-light transition hover:bg-brand-darker';

function Cart() {
    const { cartItems, status, itemState, load, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[900px] px-12 pb-16 pt-10">
                <h1 className="mb-7 text-[32px] font-extrabold">My Cart</h1>

                {status === 'loading' && (
                    <div role="status" className="pt-6">
                        <p className="mb-5 font-bold text-ink-muted">Loading your cart...</p>
                        <div className="flex flex-col gap-4">{[0, 1, 2].map((i) => <div key={i} className="h-[132px] animate-pulse rounded-2xl bg-border-warm/50" />)}</div>
                    </div>
                )}

                {status === 'error' && (
                    <div role="alert" className="mt-6 flex flex-col items-center gap-4 rounded-[20px] border border-red-200 bg-red-50 px-6 py-14 text-center">
                        <div className="text-xl font-extrabold text-red-800">Unable to load your cart.</div>
                        <button type="button" onClick={load} className={primaryBtn}>Try Again</button>
                    </div>
                )}

                {status === 'ready' && cartItems.length === 0 && (
                    <div className="flex flex-col items-center gap-2.5 rounded-[20px] border-[1.5px] border-dashed border-border-warm px-6 py-[72px] text-center">
                        <div className="text-2xl font-extrabold">Your cart is empty 🛒</div>
                        <div className="mb-3.5 text-base text-ink-muted">Looks like you haven't added anything yet.</div>
                        <button type="button" onClick={() => navigate('/products')} className={primaryBtn}>Browse Products</button>
                    </div>
                )}

                {status === 'ready' && cartItems.length > 0 && (
                    <>
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => {
                                const p = item.product;
                                const s = itemState[p._id] || {};
                                return (
                                    <div key={p._id} className="flex flex-wrap items-center gap-5 rounded-2xl border border-border-warm bg-cream-light p-4">
                                        <ProductImage product={p} className="size-[100px] shrink-0 rounded-xl" />
                                        <div className="flex min-w-[180px] flex-1 flex-col gap-1">
                                            <div className="text-base font-bold">{p.name}</div>
                                            <div className="text-base font-extrabold text-brand-dark">₹{p.price}</div>
                                            {s.error && <div role="alert" className="text-[13px] text-red-700">{s.error}</div>}
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <button type="button" disabled={s.busy || item.quantity <= 1} onClick={() => updateQuantity(p._id, item.quantity - 1)} className="size-8 rounded-lg border border-border-warm font-bold disabled:opacity-50">-</button>
                                            <span className="w-6 text-center font-bold">{item.quantity}</span>
                                            <button type="button" disabled={s.busy} onClick={() => updateQuantity(p._id, item.quantity + 1)} className="size-8 rounded-lg border border-border-warm font-bold disabled:opacity-50">+</button>
                                        </div>
                                        <div className="w-[90px] text-right font-extrabold">₹{p.price * item.quantity}</div>
                                        <button type="button" disabled={s.busy} onClick={() => removeFromCart(p._id)} className="text-sm font-bold text-red-700 disabled:opacity-50">{s.busy ? '...' : 'Remove'}</button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 rounded-2xl border border-border-warm bg-cream-light p-6">
                            <h2 className="mb-4 text-lg font-extrabold">Order Summary</h2>
                            <div className="mb-1.5 flex justify-between text-sm text-ink-muted"><span>Items</span><span>{totalUnits}</span></div>
                            <div className="mb-5 flex justify-between text-lg font-extrabold"><span>Subtotal</span><span>₹{subtotal}</span></div>
                            <button type="button" onClick={() => navigate('/checkout')} className={`${primaryBtn} w-full`}>Proceed to Checkout</button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Cart;
