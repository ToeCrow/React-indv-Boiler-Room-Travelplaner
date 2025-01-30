import React, { useState, useEffect } from 'react';
import TripItem from './TripItem';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';
import useFetch from '../../Components/useFetch';
import { useNavigate } from 'react-router-dom';

const TripList = () => {
  // Hämtar trips med hjälp av useFetch hook
  const { data: trips, loading, error, statusCode } = useFetch('http://localhost:3001/trips');
  const [updatedTrips, setUpdatedTrips] = useState([]);
  const navigate = useNavigate();

  // Uppdatera trips så fort de ändras
  useEffect(() => {
    if (trips) {
      setUpdatedTrips(trips);
    }
  }, [trips]);

  const handleClickAdd = () => {
    navigate('/add-trip'); // Navigera till en ny resa form
  };

  return (
    <main>
      <div id="trip-header">
        <h2>Dina planerade resor</h2>
        <div id="add-trip">
          <button onClick={handleClickAdd} className='add-button'>+</button>
          <p>Tryck för att lägga till en ny resa</p>
        </div>
      </div>
      
      {/* {error && <ErrorScreen statusCode={statusCode} message={error} />} */}
      {loading && <LoadingScreen />}
      {updatedTrips && <TripItem trips={updatedTrips} setTrips={setUpdatedTrips} />}
    </main>
  );
};

export default TripList;
