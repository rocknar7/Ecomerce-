import React, { useEffect, useState } from 'react';
import { cart as cartService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Cart({ user }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const load = async () => {
    try {
      const res = await cartService.get();
      setCart(res.cart);
    } catch (err) {
      if (err.message === 'No token') navigate('/login');
      else console.error(err);
    }
  };
  useEffect(() => { load(); }, []);

  const updateQty = async (itemId, qty) => {
    await cartService.update(itemId, qty);
    await load();
  };

  const remove = async (itemId) => {
    await cartService.remove(itemId);
    await load();
  };

  const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          <div className="cart-list">
            {cart.map(c => (
              <div key={c.item._id} className="cart-item">
                <div>{c.item.title}</div>
                <div>₹{c.item.price}</div>
                <div>
                  <button onClick={() => updateQty(c.item._id, Math.max(1, c.qty - 1))}>-</button>
                  <span>{c.qty}</span>
                  <button onClick={() => updateQty(c.item._id, c.qty + 1)}>+</button>
                </div>
                <div><button onClick={() => remove(c.item._id)}>Remove</button></div>
              </div>
            ))}
          </div>
          <div className="checkout">
            <h3>Total: ₹{total}</h3>
            <button className="btn">Checkout (not implemented)</button>
          </div>
        </>
      )}
    </div>
  );
}
