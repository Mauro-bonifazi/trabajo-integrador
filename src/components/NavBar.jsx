import React from 'react';
import '../styles/NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="/">ShopCart</a></li>
        <li><a href="/productos">Tienda</a></li>

        <li><a href="/contacto">Contacto</a></li>
        <li><a href="/contacto">Login</a></li>

      </ul>
    </nav>
  );
}

export { NavBar }