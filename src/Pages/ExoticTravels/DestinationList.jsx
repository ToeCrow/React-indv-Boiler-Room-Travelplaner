import React, { useState, useEffect } from 'react';
import './DestinationList.css';
import LazyImage from '../../Components/LazyImage/LazyImage';
import TravelList from './TravelList';


const DestinationDetails = ({ destination }) => {
  return (
    <div className="destination-details">
      <h2>{destination.name}</h2>
      <p>{destination.introduction}</p>
      <LazyImage 
        smallSrc={destination.thumbnail}
        largeSrc={destination.imageLink}
        altText={destination.name}
        className="destination-image" />  
      <section id="travel-info">
      <TravelList title="Attractions" items={destination.attractions} />
        <TravelList title="Food and Drink" items={destination.foodAndDrink} />
        <TravelList title="Accommodation" items={destination.accommodation} />
        <TravelList title="Personal Tips" items={destination.personalTips} />
      </section>
      <h3>Travel Conditions</h3>
      <p>{destination.travelConditions}</p>
    </div>
  );
};

const DestinationList = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/destinations')
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        if (data.length > 0) {
          setSelectedDestination(data[0]); // 🚀 Välj första destinationen direkt
        }
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <main className="destination-menu">
        <div className="destination-list">
        <ul>
          {destinations.map((destination, index) => (
            <li key={index} onClick={() => handleDestinationClick(destination)}>
              {destination.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedDestination && (
        <DestinationDetails destination={selectedDestination} />
      )}
    </main>
  );
};

export default DestinationList;
