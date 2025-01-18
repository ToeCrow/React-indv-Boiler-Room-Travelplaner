import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import ErrorScreen from './ErrorScreen/ErrorScreen';
import useFetch from '../useFetch';

const ActivityList = () => {
  const { data: activities, loading, error, statusCode } = useFetch('http://localhost:3001/activities');

  return (
    <main>
      <h2>Dina planerade aktiviteter</h2>
      {error && <ErrorScreen statusCode={statusCode} message={error} />}
      {loading && <LoadingScreen />}
      {activities && <ActivityItem activities={activities} />}
    </main>
  );
};

export default ActivityList;
