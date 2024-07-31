import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { fetchCart, removeFromCart } from '../services/apiService';

const Cart = ({ cartItems, setCartItems }) => {
  useEffect(() => {
    fetchCart().then(response => setCartItems(response.data));
  }, []);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id).then(() => {
      setCartItems(cartItems.filter(item => item.id !== id));
    });
  };

  if (cartItems.length === 0) return <Typography>Your cart is empty.</Typography>;

  return (
    <Container>
      {cartItems.map(item => (
        <div key={item.id}>
          <Typography>{item.name}</Typography>
          <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
            Remove
          </Button>
        </div>
      ))}
      <Button variant="contained" color="primary" component={Link} to="/checkout">
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
