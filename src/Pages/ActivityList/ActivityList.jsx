import { useParams } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../Components/ErrorScreen/ErrorScreen";

const ActivityList = () => {
  const { id } = useParams();
  
  // Hämta specifik resa
  const { data: trip, loading, error } = useFetch(`http://localhost:3001/trips/${id}`);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!trip) return <p>Ingen resa hittades.</p>;

  return (
    <div>
      <h2>Aktiviteter för {trip.place}</h2>
      {trip.activities.length === 0 ? (
        <p>Inga aktiviteter planerade.</p>
      ) : (
        <ul>
          {trip.activities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.activity}</strong> - {activity.date} ({activity.place})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;
