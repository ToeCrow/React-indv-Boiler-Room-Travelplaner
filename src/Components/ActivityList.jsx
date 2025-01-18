import React from 'react'
import ActivityItem from './ActivityItem'
import { useState } from 'react'
import { useEffect } from 'react';



const ActivityList = () => {
  
const [activities, setActivities] = useState(null);
const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
  };

  useEffect(() => {
    fetch('http://localhost:3001/activities')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false); // Sätt loading till false när data har hämtats
      });
  }, []);

  if (loading) {
    return <p>Laddar aktiviteter...</p>; // Visa laddningsindikator
  }

  if (!activities) {
    return <p>Inga aktiviteter hittades.</p>;
  }

  return (
    <section>
      <h2>Dina planerade aktiviteter</h2>
      <ActivityItem activities={activities} handleDelete={handleDelete}/>
    </section>
  )
}

export default ActivityList