import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const NotFound = () => {

  const [timer, setTimer] = useState(10); // Start timer at 10 seconds
  const navigate = useNavigate();

  // When the compontet mounts, start the timer
  useEffect(() => {
    if (timer === 0) {
      // WHen the timer reaches 0, navigate to the home page
      navigate('/');
    } else {
      // Reduce the timer every second
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      // Clean up the interval
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