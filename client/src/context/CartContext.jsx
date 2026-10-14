// client/src/context/CartContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import api from '../services/api';

const CartContext = createContext(null);

const errMsg = (err, fallback) =>
    err.response?.data?.message ||
    (!err.response ? 'Network error. Check your connection and try again.' : fallback);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState('idle');
    const [itemState, setItemState] = useState({});
    const inFlight = useRef({});

    const load = async () => {
        setStatus('loading');
        try {
            const res = await api.get('/cart');
            setCartItems(res.data.cart);
            setStatus('ready');
        } catch {
            setStatus('error');
        }
    };

    useEffect(() => { load(); }, []);

    const addToCart = async (productId) => {
        if (inFlight.current[productId]) return;
        inFlight.current[productId] = true;
        setItemState((s) => ({ ...s, [productId]: { busy: true } }));
        try {
            await api.post(`/cart/${productId}`);
            await load();
            setItemState((s) => ({ ...s, [productId]: undefined }));
        } catch (err) {
            setItemState((s) => ({ ...s, [productId]: { busy: false, error: errMsg(err, 'Could not add to cart.') } }));
        } finally {
            inFlight.current[productId] = false;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (inFlight.current[productId]) return;
        inFlight.current[productId] = true;
        setItemState((s) => ({ ...s, [productId]: { busy: true } }));
        try {
            await api.patch(`/cart/${productId}`, { quantity });
            await load();
            setItemState((s) => ({ ...s, [productId]: undefined }));
        } catch (err) {
            setItemState((s) => ({ ...s, [productId]: { busy: false, error: errMsg(err, 'Could not update quantity.') } }));
        } finally {
            inFlight.current[productId] = false;
        }
    };

    const removeFromCart = async (productId) => {
        if (inFlight.current[productId]) return;
        inFlight.current[productId] = true;
        setItemState((s) => ({ ...s, [productId]: { busy: true } }));
        try {
            await api.delete(`/cart/${productId}`);
            setCartItems((s) => s.filter((item) => item.product._id !== productId));
            setItemState((s) => ({ ...s, [productId]: undefined }));
        } catch (err) {
            setItemState((s) => ({ ...s, [productId]: { busy: false, error: errMsg(err, 'Could not remove this item.') } }));
        } finally {
            inFlight.current[productId] = false;
        }
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = { cartItems, status, itemState, itemCount, load, addToCart, updateQuantity, removeFromCart };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    return useContext(CartContext);
}
