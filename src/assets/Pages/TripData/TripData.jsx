import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const TripData = ({ flights }) => {
  console.log(flights)

  const [value, setValue] = useState({ 
startDate: new Date(), 
endDate: new Date().setMonth(11) 
}); 

const handleValueChange = (newValue) => {
console.log("newValue:", newValue); 
setValue(newValue); 
} 

  return (
    <div className='mt-6'>
    <p className='text-2xl font-bold text-center'>Master Price</p>
    <div role="tablist" class="tabs tabs-boxed max-w-96 mx-auto my-6">
  <a role="tab" class="tab">Round Trip</a>
  <a role="tab" class="tab tab-active">One Day</a>
  <a role="tab" class="tab">Muli city</a>
</div>
<div className='flex gap-3 border-y-2 py-3 border-indigo-500'>
  <label className="input  input-bordered flex w-36 items-center ">
  <input type="text" className="grow" placeholder="LHR" />
</label>
  <label className="input input-bordered w-36 flex items-center ">
    <input type="text" className="grow" placeholder="CDG" />
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
<select className="select select-bordered w-full max-w-32">
  <option disabled selected>Any Time</option>
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
  <option>7</option>
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
<button className="btn bg-green-500 text-white">Search</button>
</div>
<div className='flex my-4  border-y-2 py-3  border-indigo-500'>
<div className='flex gap-2'>
  <input type="checkbox" defaultChecked className="checkbox" />
<p>Extra Options</p>
</div>
<div className='mx-auto max-w-96 flex gap-6'>
<input type="radio" name="radio-1" className="radio" checked />
<p>Environment</p>
<input type="radio" name="radio-1" className="radio" />
<p>Dummy</p>
<input type="radio" name="radio-1" className="radio" />
<p>PDT</p>
</div>
</div>
    <div>

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
            {flights.map((offer, index) => offer.itineraries.map((itinerary, itineraryIndex) => (
              <tr key={index + '-' + itineraryIndex}>
                <td>{offer.itineraries.map(it => it.segments.map(seg => `${seg.marketingCarrier}${seg.flightNumber}`).join(", ")).join(" | ")} </td>
                <td>{offer.itineraries.map(it => it.segments.map(seg => seg.aircraft).join(", ")).join(" | ")}</td>
                <td>{offer.class.flat().join(", ")}</td>
                <td>{offer.fareBasis.flat().join(", ")}</td>
                <td>{offer.itineraries.map(it => `${it.segments[0].departure.iataCode}-${it.segments[it.segments.length - 1].arrival.iataCode}`).join(" → ")} </td>
                <td>{offer.itineraries[0].segments[0].departure.at}</td>
                <td>{offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at}</td>
                <td>{itinerary.duration}</td>
                <td>${offer.price}</td>
                <td><button className='btn btn-outline btn-success btn-sm'>Select</button></td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TripData;
