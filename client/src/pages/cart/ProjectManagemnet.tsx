// src/pages/cart/ProjectManagement.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../interface/interface';
import { getCart, removeFromCart, updateCart } from '../../service/product.service';

export default function ProjectManagement() {
  const cart: Product[] = useSelector((state: any) => state.product.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleUpdate = (id: number, quantity: number) => {
    dispatch(updateCart({ id, quantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cart.reduce((total, item) => total + Number(item.price) * Number(item.total), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div>
            <img width="100px" src={item.img} alt={item.nameProduct} />
          </div>
          <div>
            <b>{item.nameProduct}</b>
            <input
              type="number"
              value={item.total}
              onChange={(e) => handleUpdate(item.id, Number(e.target.value))}
              min="1"
              max={Number(item.total)}
            />
            <p>Quantity: {item.total}</p>
          </div>
          <div>
            <b>${item.price}</b>
            <button onClick={() => handleUpdate(item.id, Number(item.total))}>Update</button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div>
        <div><b>Subtotal</b></div>
        <div><b>${subtotal.toFixed(2)}</b></div>
      </div>
    </div>
  );
}
