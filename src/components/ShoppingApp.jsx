import React from 'react';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect } from 'react';
import { ProductList } from './ProducList';





const ShoppingApp = () => {
  //Logíca de carrito y renderizado de la aplicación
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  //Función para agregar productos al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, se actualiza la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, se agrega con una cantidad inicial de 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  //Función para remover productod del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };
  //Función para aumentar y disminuir la cantidad de un producto del carrito
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };
  //Funcion para mostrar u ocultar el carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  //Función para calcular el total de la compra
  const calculateTotal = () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };
  // Efecto para recalcular el total cuando cambia el contenido del carrito
  useEffect(() => {
    calculateTotal();
  }, [cart]);
  //Funcion para finalizar la compra
  const finalizarCompra = () => {
    setShowPaymentForm(true); // Mostrar formulario de pago al finalizar la compra
  };
  //Función para manejo del envio del formulario de compra
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar la compra
    setCart([]);
    setTotal(0);
    alert('¡Compra finalizada!');
    alert('Gracias por su compra!')
    setShowPaymentForm(false); // Ocultar formulario después de finalizar la compra
  };

  return (
    <div>
      <h1>Tienda</h1>
      <ShoppingCartIcon onClick={toggleCart} />
      <ProductList addToCart={addToCart} />

      <Drawer anchor="right"
        open={isCartOpen}
        onClose={toggleCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: '500px',
          },
          '& .cart-items': {
            padding: '20px',
          },
          '& .cart-item': {
            marginBottom: '20px',
          },
          '& .cart-total': {
            fontWeight: 'bold',
            marginTop: '10px',
          },
          '& .buy-button': {
            padding: '8px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
          },
        }}
      >
        <div className="cart-items">
          <h2>Carrito de Compras</h2>
          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <p>{product.title}</p>
              <p>Precio: ${product.price}</p>
              <p>Cantidad: {product.quantity}</p>
              <button
                onClick={() => increaseQuantity(product.id)}
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  margin: '5px',
                  '&:hover': {
                    backgroundColor: 'darkblue',
                  },
                }}
              >
                +
              </button>
              <button
                onClick={() => decreaseQuantity(product.id)}
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  margin: '5px',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
                }}
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(product.id)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  margin: '5px',
                  '&:hover': {
                    backgroundColor: 'darkgray',
                  },
                }}
              >
                Eliminar
              </button>

            </div>
          ))}
          <div className="cart-total">Total: ${total}</div>
          <button
            className="buy-button"
            onClick={finalizarCompra}
            style={{
              padding: '15px 40px',
              backgroundColor: 'blue',
              color: 'white',
              border: '2px solid blue',
              borderRadius: '8px',
              display: 'block',
              margin: '0 auto',
            }}
          >
            Comprar
          </button>
        </div>
      </Drawer>


      <Drawer anchor="right" open={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Formulario de Pago</h2>
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Número de tarjeta:
              <input type="number" style={{ padding: '5px' }} />
            </label>
            <label type="number" style={{ display: 'flex', flexDirection: 'column' }}>
              Fecha de expiración:
              <input type="text" style={{ padding: '5px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              CVV:
              <input type="text" style={{ padding: '5px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Nombre del titular:
              <input type="text" style={{ padding: '5px' }} />
            </label>

            <button type="submit" style={{ padding: '8px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Confirmar Pago</button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
export { ShoppingApp };