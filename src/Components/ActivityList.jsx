import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import ErrorScreen from './ErrorScreen/ErrorScreen';
import useFetch from '../useFetch';

const ActivityList = () => {
  const [activities, setActivities] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [statusCode, setStatusCode] = useState(null);
  const { data: activities, loading, error, statusCode } = useFetch('http://localhost:3001/activities');

  const handleDelete = (id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
  };

  // useEffect(() => {
  //   fetch('http://localhost:3001/activities')
  //     .then(response => {
  //       setStatusCode(response.status); // Sätt statuskod
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setActivities(data);
  //       setLoading(false);
  //       setError(null);
  //     })
  //     .catch(error => {
  //       setError('Error fetching activities: ' + error.message);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <section>
      <h2>Dina planerade aktiviteter</h2>
      {error && <ErrorScreen statusCode={statusCode} message={error} />}
      {loading && <LoadingScreen />}
      {activities && <ActivityItem activities={activities} handleDelete={handleDelete} />}
    </section>
  );
};

export default ActivityList;
