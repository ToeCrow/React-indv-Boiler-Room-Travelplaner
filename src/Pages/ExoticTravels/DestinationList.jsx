import React, { useState, useEffect } from 'react';
import './DestinationList.css';
// import Socotra from "../../assets/Socotra.jpg"; 
// import SocotraSmall from '../../assets/SocotraSmall.jpg';
// import Minsk from '../../assets/Minsk.jpg';
// import MinskSmall from '../../assets/MinskSmall.jpg';
// import Comoros from '../../assets/Comoros.jpg';
// import ComorosSmall from '../../assets/ComorosSmall.jpg';
// import Svalbard from '../../assets/Svalbard.jpg';
// import SvalbardSmall from '../../assets/SvalbardSmall.jpg';
import LazyImage from '../../Components/LazyImage/LazyImage';


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
        <div className='travel-list'>
          <h3>Attractions</h3>
          <ul>
            {destination.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
        <div className='travel-list'>
          <h3>Food and Drink</h3>
          <ul>
            {destination.foodAndDrink.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        <div className='travel-list'>
          <h3>Accommodation</h3>
          <ul>
            {destination.accommodation.map((accommodation, index) => (
              <li key={index}>{accommodation}</li>
            ))}
          </ul>
        </div>
        <div className='travel-list'>
          <h3>Personal Tips</h3>
          <ul>
            {destination.personalTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
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
        console.log("Fetched data:", data); // Kolla att bilderna laddas korrekt
        setDestinations(data);
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
