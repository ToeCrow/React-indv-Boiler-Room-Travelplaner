import React from 'react'

const ActivityItem = ({activities, handleDelete}) => {

  return (
    <ul>
      {activities.map(({ id,activity, date, place}) => (
        <li key={id}>
          <strong>{activity}</strong> - {date} - {place}
          <button>Ändra</button>
          <button onClick={() => handleDelete(id)}>Radera</button>
        </li>
      ))}
    </ul>
  )
}

export default ActivityItem