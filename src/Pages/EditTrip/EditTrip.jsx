import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Components/useFetch";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../Components/ErrorScreen/ErrorScreen";
import './EditTrip.css';

// Hämtar data från API och sätter rätt URL för att redigera trippen med ID
const EditTrip = () => {
  const { id } = useParams();
  const { data: trip, error, loading } = useFetch(`http://localhost:3001/trips/${id}`);
  const [formData, setFormData] = useState({
    place: '',
    fromDate: '',
    toDate: '',
    transport: ''
  });
  const navigate = useNavigate();

  // Fyller i formuläret med data från API
  useEffect(() => {
    if (trip) {
      setFormData({
        place: trip.place,
        fromDate: trip.fromDate,
        toDate: trip.toDate,
        transport: trip.transport
      });
    }
  }, [trip]);

  // Hantera ändringar i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Hantera formulärinlämning
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/trips/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update trip');
        }
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Ett fel inträffade vid uppdatering av resan');
      });
  };

  // Kontrollera om några fält är tomma
  const isFormInvalid = !formData.place || !formData.fromDate || !formData.toDate || !formData.transport;

  return (
    <div id="edit-trip">
      {loading && <LoadingScreen />}
      {error && <ErrorScreen message={error} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <h2>Ändra resa</h2>
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
          <label>
            Från Datum:
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Till Datum:
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Transport:
            <input
              type="text"
              name="transport"
              value={formData.transport}
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

          {/* Meddelande */}
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

export default EditTrip;
