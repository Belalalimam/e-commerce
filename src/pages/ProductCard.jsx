import { useLikes } from '../context/LikeContext';

function ProductCard({ product }) {
  const { likedProducts, toggleLike } = useLikes();
  const isLiked = likedProducts.includes(product._id);
  console.log("🚀 ~ ProductCard ~ isLiked:", isLiked)

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <button onClick={() => toggleLike(product._id)}>
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default ProductCard;
