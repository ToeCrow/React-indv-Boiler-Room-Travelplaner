import { useParams } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../Components/ErrorScreen/ErrorScreen";
import ActivityItem from "./ActivityItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Hämta specifik resa
  const { data: trip, loading, error } = useFetch(`http://localhost:3001/trips/${id}`);
  const [updatedActivities, setUpdatedActivities] = useState([]);

  const handleClickAdd = () => {
    navigate(`/trip/${id}/add-activity`);
  };  

  useEffect(() => {
    if (trip && trip.activities) {
      setUpdatedActivities(trip.activities);
    }
  }, [trip]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!trip) return <p>Ingen resa hittades.</p>;

  return (
    <main>
      <div id="activity-header">
        <h2>Aktiviteter för {trip.place}</h2>
        <div id="add-activity">
           <button onClick={handleClickAdd} className='add-button'>+</button> 
          <p>Tryck för att lägga till en ny aktivitet</p>
        </div>
      </div>
      {updatedActivities.length === 0 ? (
        <p>Inga aktiviteter planerade.</p>
      ) : (
        <ActivityItem activities={updatedActivities} setActivities={setUpdatedActivities} />
      )}
    </main>
  );
};

export default ActivityList;