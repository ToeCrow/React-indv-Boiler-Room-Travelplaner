import { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        setStatusCode(response.status); // Sätt statuskod
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching activities: ' + error.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error, statusCode };
}

export default useFetch;