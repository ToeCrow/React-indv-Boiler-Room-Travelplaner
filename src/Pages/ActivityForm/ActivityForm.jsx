import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ActivityForm.css';
import useFetch from '../../Components/useFetch';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Hämta specifik resa
  const { data: trip, loading, error } = useFetch(`http://localhost:3001/trips/${id}`);
  
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [saving, setSaving] = useState(false);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (trip && date) {
      // Validera att datumet är inom resans tidsintervall
      if (new Date(date) < new Date(trip.fromDate) || new Date(date) > new Date(trip.toDate)) {
        setDateError(`Datumet måste vara mellan ${trip.fromDate} och ${trip.toDate}`);
      } else {
        setDateError('');
      }
    }
  }, [date, trip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!trip || dateError) return;
  
    const newActivity = { 
      activity, 
      date, 
      place, 
      tripId: trip.id // Detta kommer att länka aktiviteten till rätt resa
    };
  
    setSaving(true);
  
    try {
      // Skicka en PATCH-begäran för att lägga till en aktivitet till resan
      const response = await fetch(`http://localhost:3001/trips/${trip.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          activities: [...trip.activities, newActivity]
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
          <button type="submit" disabled={saving || !!dateError}>
            {saving ? 'Lägger till...' : 'Lägg till aktivitet'}
          </button>
          <button type="button" onClick={() => navigate(`/trip/${id}`)}>Avbryt</button>
        </div>
      </form>
    </main>
  );
};

export default ActivityForm;
