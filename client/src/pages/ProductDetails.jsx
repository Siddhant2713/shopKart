// client/src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Something went wrong while loading this product.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return null;

    return (
        <div>
            <Link to="/products">← Back to Products</Link>
            <img src={product.image} alt={product.name} style={{ width: '400px' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <p>{product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}</p>
            <button>Add to Cart</button>
        </div>
    );
}

export default ProductDetails;
