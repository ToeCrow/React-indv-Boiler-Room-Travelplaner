import React from 'react'

const ActivityItem = ({activities,}) => {

  return (
    <section>
      <ul>
        {activities.map(({ id,activity, date, place}) => (
          <li key={id}>
            <strong>{activity}</strong> - {date} - {place}
            <button>Ändra</button>
            <button>Radera</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ActivityItem