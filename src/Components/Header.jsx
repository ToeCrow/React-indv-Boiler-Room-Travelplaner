import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom

const Header = () => {
  return (
    <header>
      <h1>Reseplaneraren</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Hem</Link> {/* Länk till aktivitetslistan */}
          </li>
          <li>
            <Link to="/add-activity">Lägg till aktivitet</Link> {/* Länk till aktivitetsformuläret */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
