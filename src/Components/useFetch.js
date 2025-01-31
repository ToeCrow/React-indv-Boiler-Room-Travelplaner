import { useState, useEffect } from 'react';

const useFetch = (url, extractData = (data) => data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (!url) {
      setError('Invalid URL');
      setLoading(false);
      return;
    }
  
    setLoading(true);
    setError(null);
    fetch(url)
      .then(response => {
        setStatusCode(response.status);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
      })
      .then(data => {
        setData(extractData(data)); 
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      });
  
  }, [url]);  // Körs bara om `url` ändras
  

  return { data, loading, error, statusCode };
}

export default useFetch;
