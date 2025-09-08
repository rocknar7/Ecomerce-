import React from "react";

const ItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="card item">
      <div className="img">
        {item.image ? (
          <img src={item.image} alt={item.name || item.title} />
        ) : (
          <div className="placeholder">Image</div>
        )}
      </div>
      <h3>{item.name || item.title}</h3>
      <p>{item.category}</p>
      <p>₹{item.price}</p>
      <button onClick={() => onAddToCart(item._id)} className="btn">
        Add to cart
      </button>
    </div>
  );
};

export default ItemCard;
