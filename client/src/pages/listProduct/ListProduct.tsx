// src/pages/listProduct/ListProduct.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../interface/interface';
import { addToCart, getProduct } from '../../service/product.service';

export default function ListProduct() {
  const productState = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleAddToCart = (item: Product) => {
    if (quantity > 0 && quantity <= Number(item.total)) {
      dispatch(addToCart({ ...item, total: quantity.toString() }));
    } else {
      alert('Invalid quantity');
    }
  };

  return (
    <div>
      <h2>List Product</h2>
      {productState.products.map((item: Product) => (
        <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div>
            <img width="100px" src={item.img} alt={item.nameProduct} />
          </div>
          <div>
            <b>{item.nameProduct}</b>
            <p>{item.description}</p>
            <b>Stock: {item.total}</b>
          </div>
          <div>
            <input
              style={{ width: '50px' }}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={Number(item.total)}
            />
            <p>Price: ${item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
