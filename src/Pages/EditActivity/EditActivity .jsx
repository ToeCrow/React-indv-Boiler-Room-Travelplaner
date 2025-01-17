import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../Components/ErrorScreen/ErrorScreen";

// Gets the data from api and sets the url to edit the activity with the id
const EditActivity = () => {
  const { id } = useParams();
  const { data: activity, error, loading } = useFetch(`http://localhost:3001/activities/${id}`);
  const [formData, setFormData] = useState({
    activity: '',
    date: '',
    place: ''
  });
  const navigate = useNavigate();

  // Fills the form with the data from the api
  React.useEffect(() => {
    if (activity) {
      setFormData({
        activity: activity.activity,
        date: activity.date,
        place: activity.place
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update activity');
        }
        alert('Activity updated successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the activity');
      });
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      {error && <ErrorScreen message={error} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <h2>Ändra aktivitet</h2>
          <label>
            Aktivitet:
            <input type="text" name="activity" value={formData.activity} onChange={handleChange} />
          </label>
          <br />
          <label>
            Datum:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <br />
          <label>
            Plats:
            <input type="text" name="place" value={formData.place} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Spara ändringar</button>
        </form>
      )}
    </div>
  );
}

export default EditActivity;
