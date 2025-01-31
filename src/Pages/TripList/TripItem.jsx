import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TripItem = ({ trips, setTrips }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!trips || trips.length === 0) {
    return <p>Inga resor tillgängliga.</p>;
  }

  const handleClickEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/edit-trip/${id}`);
  };

  const handleClickShowActivities = (id) => {
    navigate(`/activity-list/${id}`);
  };

  const handleClickDelete = async (event, id) => {
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:3001/trips/${id}`, {
        method: 'DELETE',
      });

      const responseText = await response.text();
    
      if (!response.ok) {
        throw new Error(`Failed to delete trip: ${response.status} - ${responseText}`);
      }

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
        {trips.map(({ id, place, fromDate, toDate, transport, activities }) => (
          <li 
            key={id} 
            onClick={() => handleClickShowActivities(id)} 
            className='trip'
          >
            <div className='trip-item'><strong>Plats: </strong><br />{place}</div>
            <div className='trip-item'><strong>Från Datum: </strong><br />{fromDate}</div>
            <div className='trip-item'><strong>Till Datum: </strong><br />{toDate}</div>
            <div className='trip-item'><strong>Transport: </strong><br />{transport}</div>
            
            {/* Nytt fält som visar antal aktiviteter */}
            <div className='trip-item'>
              <strong>Antal aktiviteter: </strong><br />{activities ? activities.length : 0}
            </div>
            
            <div className='trip-item trip-buttons'>
              <button onClick={(event) => handleClickEdit(event, id)}>Ändra</button>
              <button onClick={(event) => handleClickDelete(event, id)}>Radera</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TripItem;
