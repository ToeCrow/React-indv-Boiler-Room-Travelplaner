import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Importera Link från react-router-dom

const Header = () => {
  return (
    <header>
      <h1>Reseplaneraren</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Hem</NavLink> {/* Länk till aktivitetslistan */}
          </li>
          <li>
            <NavLink to="/add-activity">Lägg till aktivitet</NavLink> {/* Länk till aktivitetsformuläret */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
