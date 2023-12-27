import React from 'react';
import { ShoppingApp } from './components/ShoppingApp';
import { NavBar } from './components/NavBar';


const App = () => {
  return (
    <div>
      <NavBar />

      {/* Renderiza el componente principal de la aplicación */}
      <ShoppingApp />
    </div>
  );
};

export default App;