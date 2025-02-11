import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ActivityForm.css';
import useFetch from '../../Components/useFetch';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: trip, loading, error } = useFetch(`http://localhost:3001/trips/${id}`);

  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [saving, setSaving] = useState(false);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (trip && date) {
      if (new Date(date) < new Date(trip.fromDate) || new Date(date) > new Date(trip.toDate)) {
        setDateError(`Datumet måste vara mellan ${trip.fromDate} och ${trip.toDate}`);
      } else {
        setDateError('');
      }
    }
  }, [date, trip]);

  const isFormInvalid = !activity || !date || !place || !!dateError;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!trip || dateError) return;

    const highestId = trip.activities && trip.activities.length > 0 
      ? Math.max(...trip.activities.map(a => a.id || 0)) 
      : 0;
    const newActivityId = highestId + 1;

    const newActivity = { 
      id: newActivityId,
      activity, 
      date, 
      place, 
      tripId: trip.id 
    };
  
    setSaving(true);
  
    try {
      const response = await fetch(`http://localhost:3001/trips/${trip.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          activities: [...(trip.activities || []), newActivity]
        }),
      });
  
      if (!response.ok) {
        throw new Error('Kunde inte lägga till aktiviteten');
      }
  
      navigate(`/activity-list/${trip.id}`);
    } catch (error) {
      console.error('Fel vid sparning:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Ett fel inträffade: {error}</p>;
  if (!trip) return <p>Resa hittades inte.</p>;

  return (
    <main>
      <h2>Lägg till aktivitet för {trip.place}</h2>
      <form onSubmit={handleSubmit}>
        <label>Aktivitet</label>
        <input 
          type="text" 
          required
          autoFocus
          value={activity} 
          onChange={(e) => setActivity(e.target.value)} 
        />
        
        <label>Datum</label>
        <input 
          type="date" 
          required 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        {dateError && <p className="error-message">{dateError}</p>}

        <label>Plats</label>
        <input 
          type="text" 
          required 
          value={place} 
          onChange={(e) => setPlace(e.target.value)} 
        />

        <div className="button-wrapper">
          <button 
            type="submit" 
            disabled={isFormInvalid || saving}
            className={isFormInvalid ? 'disabled-button' : ''}
          >
            {saving ? 'Lägger till...' : 'Lägg till aktivitet'}
          </button>
          {isFormInvalid && (
            <p className="hover-message">
              Du måste fylla i alla fält innan du kan skicka formuläret.
            </p>
          )}
        </div>

        <button type="button" onClick={() => navigate(`/activity-list/${id}`)}>Avbryt</button>
      </form>
    </main>
  );
};

export default ActivityForm;
