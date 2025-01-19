import React from 'react'
import './ActivityForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ActivityForm = () => {
  const [activity, setActivity] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const newActivity = {activity, date, place}

    setLoading(true);

    fetch('http://localhost:3001/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newActivity)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // Navigate to home page after successful POST
      navigate('/');
    })
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }

  return (
    <main>
      <h2>Skapa ny aktivitet</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Aktivitet</label>
        <input 
        type="text" 
        required 
        autoFocus 
        value={activity}
        onChange = {(e) => setActivity(e.target.value)}
        />
        <label htmlFor="">Datum</label>
        <input 
        type="text"
        required
        value={date}
        onChange = {(e) => setDate(e.target.value)}
        />
        <label htmlFor="">Plats</label>
        <input
         type="text"
         required
         value={place}
         onChange = {(e) => setPlace(e.target.value)}
         />
        {!loading && <button type="submit">Skapa</button>}
        {loading && <button disabled type="submit">Lägger till</button>}
        <button type="button" onClick={() => navigate('/')}>Avbryt</button>
      </form>
    </main>
  )
}

export default ActivityForm