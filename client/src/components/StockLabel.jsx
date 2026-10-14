// client/src/components/StockLabel.jsx
function StockLabel({ stock }) {
    let color = 'text-green-700';
    let label = 'In stock';
    if (stock <= 0) {
        color = 'text-red-700';
        label = 'Out of stock';
    } else if (stock <= 5) {
        color = 'text-amber-700';
        label = `Only ${stock} left`;
    }
    return <div className={`text-sm font-bold ${color}`}>● {label}</div>;
}

export default StockLabel;
