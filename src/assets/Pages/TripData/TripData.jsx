import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const TripData = ({ flights }) => {
  // console.log(flights);

  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
  }); 

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  };

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (route) => {
  fetch("/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      console.log('Data returned from API:', json);
      // Log the search input
      console.log('Search Input:', route);
      if (!Array.isArray(json)) {
        json = [json];
      }
      const filteredResults = json.filter((flight) => {
        return flight.flightOffer && flight.flightOffer.some((flightOffer) => {
          const routeSegments = flight.flightOffer.flatMap(offer => offer.itineraries.map(itinerary => itinerary.segments.map(segment => `${segment.departure.iataCode}-${segment.arrival.iataCode}`).join(", "))).join(", ");

          console.log('Route Segments:', routeSegments);
          return routeSegments.includes(route);
        });
      });
      console.log('Filtered Results:', filteredResults);
      setResults(filteredResults);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setResults([]); // Clear results in case of error
    });
};


  const handleChange = (value) => {
    setInput(value);
  };

  const handleSearch = () => {
    fetchData(input);
  };

  return (
    <div className='mt-6'>
      <p className='text-2xl font-bold text-center'>Master Price</p>
      <div role="tablist" className="tabs tabs-boxed max-w-96 mx-auto my-6">
        <a role="tab" className="tab">Round Trip</a>
        <a role="tab" className="tab tab-active">One Day</a>
        <a role="tab" className="tab">Multi-city</a>
      </div>
      <div className='flex gap-3 border-y-2 py-3 border-indigo-500'>
        <label className="input input-bordered flex w-36 items-center">
          <input type="text" className="grow" placeholder="LHR" onChange={(e) => handleChange(e.target.value)} />
        </label>
        <label className="input input-bordered w-36 flex items-center">
          <input type="text" className="grow" placeholder="CDG" onChange={(e) => handleChange(e.target.value)} />
        </label>

        <Datepicker 
          primaryColor="blue"
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
        />

        <select className="select select-bordered w-full max-w-24">
          <option disabled selected>Day -</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
        <select className="select select-bordered w-full max-w-24">
          <option disabled selected>Day +</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
        <select className="select select-bordered w-full max-w-32" name="timePreference">
          <option disabled value="">Select Time</option>
          <option value="Any Time">Any Time</option>
          <option value="Morning">Morning (5AM - 11AM)</option>
          <option value="Afternoon">Afternoon (12PM - 5PM)</option>
          <option value="Evening">Evening (6PM - 12AM)</option>
          <option value="Night">Night (1AM - 4AM)</option>
        </select>

        <p className='my-2 font-bold'>+</p>
        <select className="select select-bordered w-full max-w-24">
          <option disabled selected>ADT</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
        <select className="select select-bordered w-full max-w-20">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
        <p className='my-2 font-bold'>+</p>
        <button className="btn bg-green-500 text-white" onClick={handleSearch}>Search</button>
      </div>
      <div className='flex my-4  border-y-2 py-3  border-indigo-500'>
        <div className='flex gap-2'>
          <input type="checkbox"  className="checkbox" />
          <p>Extra Options</p>
        </div>
        <div className='mx-auto max-w-96 flex gap-6'>
          <input type="radio" name="radio-1" className="radio"  />
          <p>Environment</p>
          <input type="radio" name="radio-1" className="radio" checked/>
          <p>Dummy</p>
          <input type="radio" name="radio-1" className="radio" />
          <p>PDT</p>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
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
  {results && flights.map((offer, index) => (
    offer.itineraries.map((itinerary, itineraryIndex) => (
      <tr key={index + '-' + itineraryIndex}>
        <td>{offer.itineraries.map(it => it.segments.map(seg => `${seg.marketingCarrier}${seg.flightNumber}`).join(", ")).join(" | ")} </td>
        <td>{offer.itineraries.map(it => it.segments.map(seg => seg.aircraft).join(", ")).join(" | ")}</td>
        <td>{offer.class.flat().join(", ")}</td>
        <td>{offer.fareBasis.flat().join(", ")}</td>
        <td>{offer.itineraries.map(it => `${it.segments[0].departure.iataCode}-${it.segments[it.segments.length - 1].arrival.iataCode} , ${it.segments[1].departure.iataCode}-${it.segments[it.segments.length - 1].arrival.iataCode}`)} </td>
        <td>{offer.itineraries[0].segments[0].departure.at}</td>
        <td>{offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at}</td>
        <td>{itinerary.duration}</td>
        <td>${offer.price}</td>
        <td><button className='btn btn-outline btn-success btn-sm'>Select</button></td>
      </tr>
    ))
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default TripData;
