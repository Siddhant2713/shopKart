// client/src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import WishlistButton from './WishlistButton';
import AddToCartButton from './AddToCartButton';


function ProductCard({ product }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border-warm bg-cream-light">
            <Link to={`/products/${product._id}`}>
                <ProductImage product={product} className="aspect-square w-full" />
            </Link>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">{product.category}</div>
                <Link to={`/products/${product._id}`} className="text-[17px] font-bold leading-snug text-ink">
                    {product.name}
                </Link>
                <div className="text-lg font-extrabold text-brand-dark">₹{product.price}</div>
                <div className="min-h-2 flex-1" />
                <WishlistButton productId={product._id} />
                <AddToCartButton productId={product._id} />

            </div>
        </div>
    );
}

export default ProductCard;
