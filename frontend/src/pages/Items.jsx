import React, { useEffect, useState } from "react";
import { items as itemsService, cart as cartService } from "../services/api";
import { useNavigate } from "react-router-dom";
import AddItemForm from "../components/AddItemForm";
import EditItemForm from "../components/EditItemForm";
import DeleteButton from "../components/DeleteButton";

export default function Items({ user }) {
  const [data, setData] = useState({ items: [], total: 0 });
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await itemsService.list(filters);
      if (Array.isArray(res)) {
        setData({ items: res, total: res.length });
      } else if (res && Array.isArray(res.items)) {
        setData({ items: res.items, total: res.total || res.items.length });
      } else {
        setData({ items: [], total: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setData({ items: [], total: 0 });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addToCart = async (itemId) => {
    try {
      if (!user) return navigate("/login");
      await cartService.add(itemId, 1);
      alert("Added to cart");
    } catch (err) {
      alert(err.message);
    }
  };

  const onItemUpdated = () => {
    setEditingItemId(null);
    fetchItems();
  };

  const onItemDeleted = () => {
    fetchItems();
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <AddItemForm onAdded={fetchItems} />

      {editingItemId && (
        <div>
          <h2>Edit Product</h2>
          <EditItemForm itemId={editingItemId} onUpdated={onItemUpdated} />
          <button onClick={() => setEditingItemId(null)}>Cancel Edit</button>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        <input
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Sort</option>
          <option value="price_asc">Price low → high</option>
          <option value="price_desc">Price high → low</option>
        </select>
        <button onClick={fetchItems} className="btn">Apply</button>
      </div>

      {/* Items Grid */}
      <div className="grid">
        {Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((item) => (
            <div key={item._id} className="card item">
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
              <button onClick={() => addToCart(item._id)} className="btn">
                Add to cart
              </button>
              <button onClick={() => setEditingItemId(item._id)} className="btn">
                Edit
              </button>
              <DeleteButton itemId={item._id} onDeleted={onItemDeleted} />
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
}
