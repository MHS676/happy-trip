import React from 'react';

const TripData = ({ flights }) => {
  return (
    <div className='mt-6'>
    {flights.message}
      <div className="overflow-x-auto mt-6">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Aircraft</th>
              <th>Class</th>
              <th>Fare</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((offer, index) => offer.itineraries.map((itinerary, itineraryIndex) => (
              <tr key={index + '-' + itineraryIndex}>
                <td>{offer.itineraries.map(it => it.segments.map(seg => `${seg.marketingCarrier}${seg.flightNumber}`).join(", ")).join(" | ")}</td>
                <td>{offer.itineraries.map(it => it.segments.map(seg => seg.aircraft).join(", ")).join(" | ")}</td>
                <td>{offer.class.flat().join(", ")}</td>
                <td>{offer.fareBasis.flat().join(", ")}</td>
                <td>{offer.itineraries.map(it => `${it.segments[0].departure.iataCode}-${it.segments[it.segments.length - 1].arrival.iataCode}`).join(" → ")}</td>
                <td>{offer.itineraries[0].segments[0].departure.at}</td>
                <td>{offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at}</td>
                <td>{itinerary.duration}</td>
                <td>${offer.price}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TripData;
