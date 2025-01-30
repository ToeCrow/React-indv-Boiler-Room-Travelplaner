import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TripForm.css';

const TripForm = () => {
  const [place, setPlace] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transport, setTransport] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Skapa ett nytt trip-objekt, inklusive en tom activities-array
    const newTrip = { 
      place, 
      fromDate, 
      toDate, 
      transport,
      activities: [] // Lägg till en tom activities-array här
    };
  
    setLoading(true);
  
    // Skicka en POST-förfrågan till API:et
    fetch('http://localhost:3001/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Navigera till startsidan efter att trippen har skapats
        navigate('/');
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  

  return (
    <main>
      <h2>Skapa en ny resa</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="place">Plats</label>
        <input
          type="text"
          id="place"
          value={place}
          required
          onChange={(e) => setPlace(e.target.value)}
          autoFocus
        />

        <label htmlFor="from-date">Från Datum</label>
        <input
          type="date"
          id="from-date"
          value={fromDate}
          required
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label htmlFor="to-date">Till Datum</label>
        <input
          type="date"
          id="to-date"
          value={toDate}
          required
          onChange={(e) => setToDate(e.target.value)}
        />

        <label htmlFor="transport">Transport</label>
        <input
          type="text"
          id="transport"
          value={transport}
          required
          onChange={(e) => setTransport(e.target.value)}
        />

        <div className="button-wrapper">
          {!loading && (
            <>
              <button
                type="submit"
                disabled={!place || !fromDate || !toDate || !transport}
                className={
                  !place || !fromDate || !toDate || !transport ? 'disabled-button' : ''
                }
              >
                Skapa
              </button>
              <p className="hover-message">
                Du måste fylla i alla fält innan du kan skicka formuläret.
              </p>
            </>
          )}
          {loading && <button disabled>Lägger till...</button>}
        </div>

        <button type="button" onClick={() => navigate('/')}>
          Avbryt
        </button>
      </form>
    </main>
  );
};

export default TripForm;
