// client/src/components/ProductImage.jsx
function ProductImage({ product, className = '' }) {
    if (product.image) {
        return <img src={product.image} alt={product.name} className={`object-cover ${className}`} />;
    }
    return (
        <div className={`flex items-center justify-center bg-[repeating-linear-gradient(135deg,oklch(0.94_0.02_70)_0px,oklch(0.94_0.02_70)_12px,oklch(0.96_0.015_70)_12px,oklch(0.96_0.015_70)_24px)] ${className}`}>
            <span className="rounded-md bg-cream-light/80 px-2.5 py-1 font-mono text-xs text-ink-muted">product photo</span>
        </div>
    );
}

export default ProductImage;
