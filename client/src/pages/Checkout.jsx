// client/src/pages/Checkout.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const FIELD_LABELS = [
    ['fullName', 'Full Name'],
    ['phone', 'Phone'],
    ['addressLine1', 'Address'],
    ['city', 'City'],
    ['state', 'State'],
    ['pincode', 'Pincode'],
];

function Checkout() {
    const { cartItems, status, load } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '' });
    const [errors, setErrors] = useState({});
    const [placing, setPlacing] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        if (status === 'ready' && cartItems.length === 0) {
            navigate('/cart');
        }
    }, [status, cartItems, navigate]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const validate = () => {
        const next = {};
        FIELD_LABELS.forEach(([field]) => {
            if (!form[field] || !form[field].trim()) next[field] = 'This field is required';
        });
        if (form.phone.trim() && !/^\d{10}$/.test(form.phone.trim())) {
            next.phone = 'Phone must be a valid 10-digit number';
        }
        if (form.pincode.trim() && !/^\d{6}$/.test(form.pincode.trim())) {
            next.pincode = 'Pincode must contain 6 digits';
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setServerError('');
        if (!validate()) return;

        setPlacing(true);
        try {
            const res = await api.post('/orders/create-payment-order', { shippingAddress: form });
            const data = res.data;

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                setServerError('Could not load payment gateway. Please check your connection and try again.');
                setPlacing(false);
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: 'ShopKart',
                description: 'ShopKart Order',
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    try {
                        await api.post('/orders/verify-payment', {
                            shopKartOrderId: data.shopKartOrderId,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        await load();
                        navigate(`/orders/${data.shopKartOrderId}`, { state: { justPlaced: true } });
;
                    } catch (err) {
                        setServerError('Payment verification failed. Your cart has not been cleared. Please try again.');
                        setPlacing(false);
                    }
                },
                prefill: { name: form.fullName, contact: form.phone },
                theme: {}
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function () {
                setServerError('Payment failed. Your cart has not been cleared. Please try again.');
                setPlacing(false);
            });
            paymentObject.open();
        } catch (err) {
            setServerError(err.response?.data?.message || 'Could not start checkout. Please try again.');
            setPlacing(false);
        }
    };

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[900px] px-12 pb-16 pt-10">
                <h1 className="mb-7 text-[32px] font-extrabold">Checkout</h1>

                {serverError && (
                    <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>
                )}

                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-border-warm bg-cream-light p-6">
                        <h2 className="mb-4 text-lg font-extrabold">Shipping Details</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {FIELD_LABELS.map(([field, label]) => (
                                <div key={field}>
                                    <label className="mb-1 block text-sm font-bold text-ink">{label}</label>
                                    <input
                                        value={form[field]}
                                        onChange={handleChange(field)}
                                        className="block w-full rounded-xl border-[1.5px] border-border-warm bg-cream-light px-4 py-3 text-[15px] text-ink outline-none focus:border-brand"
                                    />
                                    {errors[field] && <div className="mt-1 text-[13px] text-red-700">{errors[field]}</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border-warm bg-cream-light p-6">
                        <h2 className="mb-4 text-lg font-extrabold">Order Summary</h2>
                        <div className="mb-4 flex flex-col gap-2">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="flex justify-between text-sm">
                                    <span>{item.product.name} × {item.quantity}</span>
                                    <span>₹{item.product.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mb-5 flex justify-between text-lg font-extrabold">
                            <span>Total</span><span>₹{subtotal}</span>
                        </div>
                        <button type="submit" disabled={placing} className="w-full rounded-xl bg-brand-dark py-3.5 text-base font-bold text-cream-light transition hover:bg-brand-darker disabled:cursor-not-allowed disabled:opacity-60">
                            {placing ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Checkout;
