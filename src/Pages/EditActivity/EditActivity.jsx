import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../Components/ErrorScreen/ErrorScreen";
import './EditActivity.css'
import { useEffect } from "react";

// Gets the data from API and sets the URL to edit the activity with the ID
const EditActivity = () => {
  const { tripId, id } = useParams();
  const { data: activity, error, loading } = useFetch(`http://localhost:3001/trips/${tripId}/activities/${id}`);

  const [formData, setFormData] = useState({
    activity: '',
    date: '',
    place: ''
  });
  const navigate = useNavigate();

  // Fills the form with the data from the API
  useEffect(() => {
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
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the activity');
      });
  };

  // Kontrollera om några fält är tomma
  const isFormInvalid = !formData.activity || !formData.date || !formData.place;

  return (
    <div id="edit-activity">
      {loading && <LoadingScreen />}
      {error && <ErrorScreen message={error} />}
      {!loading && !error && (
       <form onSubmit={handleSubmit}>
       <h2>Ändra aktivitet</h2>
       <label>
         Aktivitet:
         <input
           type="text"
           name="activity"
           value={formData.activity}
           onChange={handleChange}
         />
       </label>
       <br />
       <label>
         Datum:
         <input
           type="date"
           name="date"
           value={formData.date}
           onChange={handleChange}
         />
       </label>
       <br />
       <label>
         Plats:
         <input
           type="text"
           name="place"
           value={formData.place}
           onChange={handleChange}
         />
       </label>
       <br />
       {/* Knappen */}
       <button
         type="submit"
         disabled={isFormInvalid}
         className={isFormInvalid ? 'disabled-button' : ''}
       >
         Spara ändringar
       </button>
     
       {/* Meddelandet */}
       {isFormInvalid && (
         <p className="hover-message">
           Du måste fylla i alla fält innan du kan skicka formuläret.
         </p>
       )}
     
       <button type="button" onClick={() => navigate('/')}>Avbryt</button>
     </form>
     
      )}
    </div>
  );
};

export default EditActivity;
