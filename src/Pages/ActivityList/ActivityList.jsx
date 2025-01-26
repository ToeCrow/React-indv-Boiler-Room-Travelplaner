import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';
import useFetch from '../../Components/useFetch';

// Get props from useFetch
const ActivityList = () => {
  const { data: activities, loading, error, statusCode } = useFetch('http://localhost:3001/activities');
  const [updatedActivities, setUpdatedActivities] = useState([]);

  // Update activities instantly when activities change, or we would have to fetch again
  useEffect(() => {
    if (activities) {
      setUpdatedActivities(activities);
    }
  }, [activities]);

  return (
    <main>
      <h2>Dina planerade aktiviteter</h2>
      {error && <ErrorScreen statusCode={statusCode} message={error} />}
      {loading && <LoadingScreen />}
      {updatedActivities && <ActivityItem activities={updatedActivities} setActivities={setUpdatedActivities} />}
    </main>
  );
};

export default ActivityList;
