import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import TripData from '../TripData/TripData';

const Home = () => {
   const [flightOffers, setFlightOffers] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Your API endpoint here
      .then(response => response.json())
      .then(data => setFlightOffers(data.flightOffer))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <TripData flights={flightOffers} />
    </div>
  );
}

export default Home;
