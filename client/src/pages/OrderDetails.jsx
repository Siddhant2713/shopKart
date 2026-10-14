// client/src/pages/OrderDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function OrderDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('loading');
    const justPlaced = location.state?.justPlaced;

    useEffect(() => {
        const load = async () => {
            setStatus('loading');
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data.order);
                setStatus('ready');
            } catch {
                setStatus('error');
            }
        };
        load();
    }, [id]);

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[700px] px-12 pb-16 pt-10">
                {status === 'loading' && <p className="font-bold text-ink-muted">Loading order...</p>}
                {status === 'error' && <p className="text-red-700">Could not load this order.</p>}

                {status === 'ready' && order && (
                    <>
                        {justPlaced && (
                            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                                <div className="mb-1 text-2xl font-extrabold text-green-800">✅ Order Placed Successfully</div>
                                <p className="text-sm text-green-700">Your order has been saved successfully.</p>
                            </div>
                        )}
                        <div className="rounded-2xl border border-border-warm bg-cream-light p-6">
                            <h1 className="mb-1 text-2xl font-extrabold">Order #{order._id.slice(-8)}</h1>
                            <p className="mb-5 text-sm text-ink-muted">Status: {order.status}</p>
                            <div className="mb-5 flex flex-col gap-2">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-5 flex justify-between text-lg font-extrabold">
                                <span>Total</span><span>₹{order.totalAmount}</span>
                            </div>
                            <div className="mb-6 text-sm text-ink-muted">
                                <div className="mb-1 font-bold text-ink">Shipping to</div>
                                <div>{order.shippingAddress.fullName}, {order.shippingAddress.phone}</div>
                                <div>{order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</div>
                            </div>
                            <div className="flex gap-3">
                                <Link to="/orders" className="rounded-[10px] bg-brand-dark px-5 py-2.5 text-sm font-bold text-cream-light transition hover:bg-brand-darker">View My Orders</Link>
                                <Link to="/products" className="rounded-[10px] border-[1.5px] border-brand-dark px-5 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-brand-dark hover:text-cream-light">Continue Shopping</Link>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default OrderDetails;
