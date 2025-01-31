import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const EditActivity = () => {
  const { tripId, activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState({ activity: '', date: '', place: '' });

  // Hämta aktuell aktivitet vid mount
  useEffect(() => {
    const fetchActivity = async () => {
      const tripResponse = await fetch(`http://localhost:3001/trips/${tripId}`);
      const tripData = await tripResponse.json();

      if (!tripResponse.ok) {
        console.error("Error fetching trip data");
        return;
      }

      // Hitta rätt aktivitet i tripens activities-array
      const currentActivity = tripData.activities.find(act => act.id === parseInt(activityId));

      if (currentActivity) {
        setActivity(currentActivity);
      } else {
        console.error("Activity not found!");
      }
    };

    fetchActivity();
  }, [tripId, activityId]);

  // Hantera input-förändringar
  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  // Hantera uppdatering av aktivitet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tripResponse = await fetch(`http://localhost:3001/trips/${tripId}`);
      const tripData = await tripResponse.json();
  
      if (!tripResponse.ok) {
        throw new Error("Failed to fetch trip");
      }
  
      const updatedActivities = tripData.activities.map(act =>
        act.id === parseInt(activityId) ? activity : act
      );
  
      const updatedTrip = { ...tripData, activities: updatedActivities };
  
      const updateResponse = await fetch(`http://localhost:3001/trips/${tripId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTrip),
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update activity");
      }
  
      
      navigate(`/activity-list/${tripId}`);
  
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Redigera Aktivitet</h2>
      <label>Aktivitet:</label>
      <input type="text" name="activity" value={activity.activity} onChange={handleChange} required />

      <label>Datum:</label>
      <input type="date" name="date" value={activity.date} onChange={handleChange} required />

      <label>Plats:</label>
      <input type="text" name="place" value={activity.place} onChange={handleChange} required />

      <button type="submit">Spara ändringar</button>
      <button type="button" onClick={() => navigate(`/trip/${tripId}`)}>Avbryt</button>
    </form>
  );
};

export default EditActivity;
