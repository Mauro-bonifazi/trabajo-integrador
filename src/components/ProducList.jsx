import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { Product } from './Product';


const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', p: 2 }}>
      {products.map((product) => (
        <div key={product.id}>
          <Product
            title={product.title}
            image={product.image}
            price={product.price}
          />
          <Button
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </Button>
        </div>
      ))}
    </Box>
  );
};

export { ProductList };