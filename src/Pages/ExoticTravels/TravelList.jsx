import React from 'react';

const TravelList = ({ title, items }) => {
  return (
    <div className="travel-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TravelList;
