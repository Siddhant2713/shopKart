// client/src/pages/Orders.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';

const primaryBtn = 'rounded-xl bg-brand-dark px-7 py-3 text-[15px] font-bold text-cream-light transition hover:bg-brand-darker';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('loading');
    const navigate = useNavigate();

    const load = async () => {
        setStatus('loading');
        try {
            const res = await api.get('/orders');
            setOrders(res.data.orders);
            setStatus('ready');
        } catch {
            setStatus('error');
        }
    };

    useEffect(() => { load(); }, []);

    return (
        <div className="min-h-svh bg-cream text-ink">
            <Navbar />
            <main className="mx-auto max-w-[900px] px-12 pb-16 pt-10">
                <h1 className="mb-7 text-[32px] font-extrabold">My Orders</h1>

                {status === 'loading' && (
                    <div role="status" className="pt-6">
                        <p className="mb-5 font-bold text-ink-muted">Loading your orders...</p>
                        <div className="flex flex-col gap-4">{[0, 1].map((i) => <div key={i} className="h-[150px] animate-pulse rounded-2xl bg-border-warm/50" />)}</div>
                    </div>
                )}

                {status === 'error' && (
                    <div role="alert" className="mt-6 flex flex-col items-center gap-4 rounded-[20px] border border-red-200 bg-red-50 px-6 py-14 text-center">
                        <div className="text-xl font-extrabold text-red-800">Unable to load your orders.</div>
                        <button type="button" onClick={load} className={primaryBtn}>Try Again</button>
                    </div>
                )}

                {status === 'ready' && orders.length === 0 && (
                    <div className="flex flex-col items-center gap-2.5 rounded-[20px] border-[1.5px] border-dashed border-border-warm px-6 py-[72px] text-center">
                        <div className="text-xl font-extrabold">You have not placed any orders yet.</div>
                        <button type="button" onClick={() => navigate('/products')} className={`${primaryBtn} mt-3`}>Start Shopping</button>
                    </div>
                )}

                {status === 'ready' && orders.length > 0 && (
                    <div className="flex flex-col gap-4">{orders.map((order) => <OrderCard key={order._id} order={order} />)}</div>
                )}
            </main>
        </div>
    );
}

export default Orders;
