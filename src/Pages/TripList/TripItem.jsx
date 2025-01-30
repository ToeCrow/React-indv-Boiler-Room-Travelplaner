import React from 'react';

const TripItem = ({ trips, setTrips }) => {
  const handleClickEdit = (id) => {
    // Redirigera användaren till TripForm med rätt id för redigering
    navigate(`/edit-trip/${id}`);
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/trips/${id}`, {
        method: 'DELETE',
      });
  
      const responseText = await response.text();
    
      if (!response.ok) {
        throw new Error(`Failed to delete trip: ${response.status} - ${responseText}`);
      }

      // Ta bort resan från listan utan att hämta om data
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
      alert('Resan har raderats.');
    } catch (error) {
      console.error('Error:', error);
      alert('Ett fel inträffade vid radering av resan.');
    }
  };

  return (
    <section>
      <ul>
        {trips.map(({ id, place, fromDate, toDate, transport }) => (
          <li className='trip' key={id}>
            <div className='trip-item'><strong>Plats: </strong>{place}</div>
            <div className='trip-item'><strong>Från Datum: </strong>{fromDate}</div>
            <div className='trip-item'><strong>Till Datum: </strong>{toDate}</div>
            <div className='trip-item'><strong>Transport: </strong>{transport}</div>
            <div className='trip-item trip-buttons'>
              <button onClick={() => handleClickEdit(id)}>Ändra</button>
              <button onClick={() => handleClickDelete(id)}>Radera</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TripItem;
