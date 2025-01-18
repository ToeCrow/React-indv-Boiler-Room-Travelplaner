import React from 'react'
import './ActivityForm.css'

const ActivityForm = () => {
  return (
    <main>
      <h2>Skapa aktivitet</h2>
      <div id='activity-form'>
        <div className='activity-input'>
          <label htmlFor="activity">Aktivitet</label><input type="text" id='activity' />
        </div>
        <div className='activity-input'>
          <label htmlFor="date">Datum</label><input type="text" id='date' />
        </div>
        <div className='activity-input'>
          <label htmlFor="place">Plats</label><input type="text" id='place' />
        </div>
        <button>Lägg till</button>
      </div>
    </main>
  )
}

export default ActivityForm