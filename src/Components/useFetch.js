import { useState, useEffect } from 'react';

const useFetch = (url, extractData = (data) => data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        setStatusCode(response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(extractData(data)); // Anpassa datan vid behov
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error, statusCode };
}

export default useFetch;
