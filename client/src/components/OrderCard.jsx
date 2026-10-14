// client/src/components/OrderCard.jsx
import { Link } from 'react-router-dom';

function OrderCard({ order }) {
    const date = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="rounded-2xl border border-border-warm bg-cream-light p-5">
            <div className="mb-1 flex items-center justify-between">
                <span className="font-bold">Order #{order._id.slice(-8)}</span>
                <span className="text-sm text-ink-muted">{date}</span>
            </div>
            <div className="mb-3 flex flex-col gap-0.5 text-sm text-ink-muted">
                {order.items.map((item, i) => <span key={i}>{item.name} × {item.quantity}</span>)}
            </div>
            <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-extrabold text-brand-dark">₹{order.totalAmount}</span>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink-muted">{order.status}</span>
            </div>
            <Link to={`/orders/${order._id}`} className="inline-block rounded-[10px] bg-brand-dark px-4 py-2 text-sm font-bold text-cream-light transition hover:bg-brand-darker">
                View Details
            </Link>
        </div>
    );
}

export default OrderCard;
