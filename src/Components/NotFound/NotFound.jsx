import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const NotFound = () => {

  const [timer, setTimer] = useState(10); // Starta timern på 10 sekunder
  const navigate = useNavigate();

  // När komponenten laddas startar timern
  useEffect(() => {
    if (timer === 0) {
      // När timern är 0, navigera tillbaka till hemsidan
      navigate('/');
    } else {
      // Minska timern varje sekund
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      // Städa upp intervallet när komponenten unmountas eller när timern når 0
      return () => clearInterval(interval);
    }
  }, [timer, navigate]);

  return (
    <div className="not-found">
      <h2>Ledsen</h2>
      <p>Kan inte hitta denna sidan</p>
      <Link to="/">Klicka här för att komma tillbaka</Link>

      <p>Du tas tillbaka till hemsidan om {timer} sekunder.</p>
    </div>
  )
}

export default NotFound