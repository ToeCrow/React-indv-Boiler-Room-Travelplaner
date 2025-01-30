import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';
import useFetch from '../../Components/useFetch';
import { useNavigate } from 'react-router-dom';

// Get props from useFetch
const ActivityList = () => {
  const { data: activities, loading, error, statusCode } = useFetch('http://localhost:3001/activities');
  const [updatedActivities, setUpdatedActivities] = useState([]);
  const navigate = useNavigate();

  // Update activities instantly when activities change, or we would have to fetch again
  useEffect(() => {
    if (activities) {
      setUpdatedActivities(activities);
    }
  }, [activities]);

  const handleClickAdd = () => {
    navigate('/add-activity');
  };

  return (
    <main>
      <div id="activity-header">
        <h2>Dina planerade aktiviteter</h2>
        <button onClick={handleClickAdd} className='add-button'>+</button>
      </div>
      {error && <ErrorScreen statusCode={statusCode} message={error} />}
      {loading && <LoadingScreen />}
      {updatedActivities && <ActivityItem activities={updatedActivities} setActivities={setUpdatedActivities} />}
    </main>
  );
};

export default ActivityList;
