import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const ActivityItem = ({ activities, setActivities }) => {
  const navigate = useNavigate();
  const { id: tripId } = useParams(); // Hämta tripId från URL
  const [deleteMessage, setDeleteMessage] = useState('');
  
  // Sortera aktiviteterna baserat på datum
  const sortedActivities = activities.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Hantera redigering av en aktivitet
  const handleClickEdit = (activityId) => {
    navigate(`/trip/${tripId}/edit-activity/${activityId}`);
  };

  // Hantera radering av en aktivitet
  const handleClickDelete = async (activityId) => {
    try {
      // 1. Hämta tripen från servern
      const tripResponse = await fetch(`http://localhost:3001/trips/${tripId}`);
      const tripData = await tripResponse.json();
  
      if (!tripResponse.ok) {
        throw new Error(`Failed to fetch trip: ${tripResponse.status}`);
      }
  
      // 2. Filtrera bort aktiviteten från listan
      const updatedActivities = tripData.activities.filter(activity => activity.id !== activityId);
  
      // 3. Uppdatera trip-objektet utan den raderade aktiviteten
      const updatedTrip = { ...tripData, activities: updatedActivities };
  
      // 4. Skicka en PUT-request för att uppdatera tripen i db.json
      const updateResponse = await fetch(`http://localhost:3001/trips/${tripId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTrip),
      });
  
      if (!updateResponse.ok) {
        throw new Error(`Failed to update trip: ${updateResponse.status}`);
      }
  
      // 5. Uppdatera state
      setActivities(updatedActivities);
      setDeleteMessage('Aktiviteten har raderats.');
      setTimeout(() => setDeleteMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setDeleteMessage('Ett fel inträffade vid radering av aktiviteten.');
    }
  };
  
  return (
    <section>
      {deleteMessage && <p>{deleteMessage}</p>} {/* Visar meddelande vid radering */}
      <ul>
        {sortedActivities.map(({ id, activity, date, place }) => (
          <li className='activity' key={id}>
            <div className='activity-item'><strong>Aktivitet: <br /> {activity} </strong></div>
            <div className='activity-item'><strong>Datum:</strong> <br /> {date}  </div>
            <div className='activity-item'><strong>Plats:</strong> <br /> {place} </div>
            <div className='activity-item activity-buttons'>
              <button onClick={() => handleClickEdit(id)}>Ändra</button>
              <button onClick={() => handleClickDelete(id)}>Radera</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityItem;
