import React, { useState } from 'react';
import './DestinationList.css';
import Socotra from "../../assets/Socotra.jpg"; 
import SocotraSmall from '../../assets/SocotraSmall.jpg';
import Minsk from '../../assets/Minsk.jpg';
import MinskSmall from '../../assets/MinskSmall.jpg';
import Comoros from '../../assets/Comoros.jpg';
import ComorosSmall from '../../assets/ComorosSmall.jpg';
import Svalbard from '../../assets/Svalbard.jpg';
import SvalbardSmall from '../../assets/SvalbardSmall.jpg';
import LazyImage from '../../Components/LazyImage/LazyImage';

// Sample data array (resemål)
const destinations = [
  {
    name: "Socotra, Yemen",
    introduction: "Socotra is a remote island in the Arabian Sea, part of Yemen but isolated from its political turmoil. Known for its otherworldly landscapes and unique biodiversity, it has been dubbed the 'Galápagos of the Indian Ocean.' The island boasts numerous endemic species of flora and fauna, including the iconic Dragon's Blood tree, which cannot be found anywhere else on Earth.",
    imageLink: Socotra,
    tumbnail: SocotraSmall,
    attractions: [
      "Explore the ancient Dragon's Blood forests",
      "Pristine beaches like Qalansiyah Beach",
      "Crystal-clear waters of Detwah Lagoon",
      "Hiking in the Haggier Mountains",
      "Camping at the Arher sand dunes"
    ],
    foodAndDrink: [
      "Seafood",
      "Goat meat",
      "Rice",
      "Local Socotri dishes at small local eateries"
    ],
    accommodation: [
      "Eco-friendly camping experiences with tour groups"
    ],
    personalTips: [
      "Dress modestly",
      "Respect local customs",
      "Avoid disturbing wildlife",
      "Bring your own snorkel gear or hiking boots"
    ],
    travelConditions: "Due to Yemen’s current conflict, you cannot obtain a Yemeni visa independently. You'll need to book a tour through a Socotri operator, who will arrange the visa for you. Flights typically connect via Cairo or Abu Dhabi."
  },
  {
    name: "Minsk, Belarus",
    introduction: "Minsk, the capital of Belarus, has a fascinating history and has been the center of several empires, from the Russian Empire to the Soviet Union. The city was almost completely destroyed during World War II, resulting in modernist architecture dominating its cityscape. Minsk is a clean, orderly, and green city with wide avenues, parks, and fountains.",
    imageLink: Minsk,
    tumbnail: MinskSmall,
    attractions: [
      "Belarusian State Museum of the Great Patriotic War",
      "Gorky Park",
      "The Island of Tears (Ostrov Slez)",
      "Minsk Sea"
    ],
    foodAndDrink: [
      "Draniki (potato pancakes)",
      "Kolduny (dumplings with meat or mushrooms)",
      "Kuhmistr restaurant for traditional Belarusian dishes",
      "Lido for healthy and local options"
    ],
    accommodation: [
      "Minsk Marriott Hotel (luxury with river view)",
      "Trinity Hostel (budget-friendly)",
      "Vesna Eco Apartments (sustainable and modern)"
    ],
    personalTips: [
      "Visit Komarovka Market for a taste of local life",
      "Take a peaceful walk along the Svislach river in the evening"
    ],
    travelConditions: "For citizens of some countries, including EU citizens, it's possible to visit Belarus visa-free for up to 30 days via Minsk International Airport. Hepatitis A and B vaccinations are recommended."
  },
  {
    name: "Svalbard, Norway",
    introduction: "Svalbard is one of the northernmost inhabited places on Earth, a Norwegian archipelago in the Arctic. Known for its pristine nature, glaciers, and polar bears, Svalbard offers a unique wilderness experience. The archipelago's history is tied to exploration, mining, and scientific research.",
    imageLink: Svalbard,
    tumbnail: SvalbardSmall,
    attractions: [
      "Ice caves and glacier hikes",
      "Dog sledding tours",
      "Pyramiden (abandoned Russian mining town)",
      "Polar research at the Svalbard Museum"
    ],
    foodAndDrink: [
      "Huset restaurant (Arctic cuisine with whale and seal meat)",
      "Fruene cafe for local specialties and baked goods",
      "Svalbard Brewery (northernmost brewery)"
    ],
    accommodation: [
      "Svalbard Hotel Polfareren (modern and sustainable)",
      "Coal Miners’ Cabins (simple, charming rooms)",
      "Basecamp Hotel (ecological, rustic)"
    ],
    personalTips: [
      "Avoid moving outside Longyearbyen without a local guide due to polar bear risks",
      "Experience the midnight sun and northern lights during winter"
    ],
    travelConditions: "No visa required for EU citizens, but a valid passport is necessary. Typically, flights go via Oslo and Tromsø, with flights to Longyearbyen. No vaccinations needed, but good travel insurance is recommended."
  },
  {
    name: "Comoros (Union of the Comoros)",
    introduction: "The Comoros, an island nation in the Indian Ocean between Mozambique and Madagascar, consists of three main islands. This often-overlooked destination has a rich history shaped by African, Arab, and French influences. The Comoros is known for its unspoiled beaches, tropical landscapes, and warm waters.",
    imageLink: Comoros,
    tumbnail: ComorosSmall,
    attractions: [
      "Mount Karthala (active volcano for hiking)",
      "Chomoni Beach (stunning beach surrounded by volcanic cliffs)",
      "Moroni (capital city with traditional markets)",
      "Mitsamiouli (great diving spot with coral reefs)"
    ],
    foodAndDrink: [
      "Langouste à la vanille (lobster cooked with locally grown vanilla)",
      "M’tsolola (traditional stew with fish or chicken)",
      "Laka Lodge restaurant for sustainable and organic meals"
    ],
    accommodation: [
      "Golden Tulip Grande Comore Moroni Resort & Spa (luxury with ocean view)",
      "Laka Lodge on Mohéli (eco-lodge with focus on sustainable tourism)",
      "Ecovillage de N’gazidja (eco-friendly accommodation)"
    ],
    personalTips: [
      "Take a guided tour through a vanilla or spice plantation",
      "Mohéli is the most untouched of the islands and a paradise for nature lovers, especially for turtle and dolphin sightings"
    ],
    travelConditions: "Visa required, usually issued on arrival. Vaccinations for Hepatitis A, Typhoid, and Yellow Fever are recommended, along with malaria prophylaxis. Flights to Moroni are available from Nairobi, Madagascar, and other African cities."
  }
];


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
