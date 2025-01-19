import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ActivityItem = ({ activities, setActivities }) => {
  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState(''); // State för raderingsmeddelande

  const handleClickEdit = (id) => {
    navigate(`/edit-activity/${id}`);
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/activities/${id}`, {
        method: 'DELETE',
      });
  
      // Logga responsstatus och text för debugging
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
  
      if (!response.ok) {
        throw new Error(`Failed to delete activity: ${response.status} - ${responseText}`);
      }
  
      setActivities(prevActivities => prevActivities.filter(activity => activity.id !== id));
      setDeleteMessage('Aktiviteten har raderats.');
      setTimeout(() => setDeleteMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setDeleteMessage('Ett fel inträffade vid radering av aktiviteten.');
    }
  };
  
  
  

  return (
    <section>
      {deleteMessage && <p>{deleteMessage}</p>} {/* Visa raderingsmeddelandet */}
      <ul>
        {activities.map(({ id, activity, date, place }) => (
          <li key={id}>
            <strong>{activity}</strong> - {date} - {place}
            <button onClick={() => handleClickEdit(id)}>Ändra</button>
            <button onClick={() => handleClickDelete(id)}>Radera</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityItem;