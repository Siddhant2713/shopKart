// client/src/components/ProductCard.jsx
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', width: '220px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>₹{product.price}</p>
            <p>{product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}</p>
            <Link to={`/products/${product._id}`}>View Details</Link>
        </div>
    );
}

export default ProductCard;
