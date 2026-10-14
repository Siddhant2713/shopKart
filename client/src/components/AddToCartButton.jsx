// client/src/components/AddToCartButton.jsx
import { useCart } from '../context/CartContext';

function AddToCartButton({ productId }) {
    const { itemState, addToCart } = useCart();
    const state = itemState[productId] || {};

    return (
        <>
            <button
                type="button"
                disabled={state.busy}
                onClick={() => addToCart(productId)}
                className="w-full rounded-[10px] border-[1.5px] border-brand-dark p-[11px] text-sm font-bold text-brand-dark transition hover:bg-brand-dark hover:text-cream-light disabled:cursor-not-allowed disabled:opacity-60"
            >
                {state.busy ? 'Adding...' : 'Add to Cart'}
            </button>
            {state.error && (
                <div role="alert" className="mt-2 rounded-lg bg-red-50 px-2.5 py-2 text-[13px] leading-snug text-red-700">{state.error}</div>
            )}
        </>
    );
}

export default AddToCartButton;
