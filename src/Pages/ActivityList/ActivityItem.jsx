import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ActivityItem = ({ activities, setActivities }) => {
  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState(''); 
  const sortedActivities = activities.sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleClickEdit = (id) => {
    navigate(`/edit-activity/${id}`);
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/activities/${id}`, {
        method: 'DELETE',
      });
  
      const responseText = await response.text();
    
      if (!response.ok) {
        throw new Error(`Failed to delete activity: ${response.status} - ${responseText}`);
      }

        // To delete the activity from the list without new rendering or fetching
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
      {deleteMessage && <p>{deleteMessage}</p>} {/* Show the delete message for 3 seconds*/}
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
