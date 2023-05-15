import React from 'react'
import {useRef, useState } from 'react'
import './GoogleApi.css'
import CarTypes from '../carTypes/CarTypes'
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import 'react-datepicker/dist/react-datepicker.css'
import {
    useJsApiLoader,
    GoogleMap,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'

function GoogleApi() {
    const google = window.google
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef()
    const destiantionRef = useRef()
    const [selectedNumber, setSelectedNumber] = useState('');
    const [showQoute, setShowQoute] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const handleCarSelect = (car) => {
      setSelectedCar(car);
    };
    const handleChange = (event) => {
      setSelectedNumber(event.target.value);
    };
    const [dateTime, setDateTime]=useState(null);
    const [startDate, setStartDate] = useState(
      setHours(setMinutes(new Date(), 30), 12));  
      const date = startDate.toISOString().slice(0, 10);
      const time = startDate.toTimeString().slice(0, 5); 
      const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR API KEY',
        libraries: ['places'],
      })
      if (!isLoaded) {
        return <div>Loading..</div>
      }

      async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destiantionRef.current.value,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        console.log('origing: '+originRef.current.value+" destination: "+destiantionRef.current.value)
        setShowQoute(true);
            }
      
  return (
    <div className='qoute_calculation'>
           <h2>Book your airport taxi</h2>
     <div className='container'>
      <div className='bookingFields'>
            <Autocomplete>
              <input 
              id='address'
              className='user_input'
              type='text' placeholder='Origin'
              ref={originRef}
               ></input>
            </Autocomplete> 
        </div>
        <div className='bookingFields'>
            <Autocomplete>
              <input
                id='address'
                className='user_input'
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              ></input>
            </Autocomplete>
         </div>

            <div className='bookingFields'>
                <DatePicker
                className='user_input'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                minTime={setHours(setMinutes(new Date(), 0), 24)}
                maxTime={setHours(setMinutes(new Date(), 30), 23)}
                dateFormat="d/MM/yyyy h:mm aa"
                 />
          </div>
          <div className='bookingFields'> 

            <select id="numberSelect" 
            value={selectedNumber} 
            onChange={handleChange}
            className='user_input'>
              <option value="">Passengers</option>
              <option value="1">1</option>
              <option value="2">2</option>
               <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5">6</option>
              <option value="5">7</option>
            </select>
          </div>
      </div>
            <CarTypes handleCarSelect={handleCarSelect}></CarTypes>
            <div className='qoute_button'>
            <button  colorScheme='pink' type='submit' onClick={calculateRoute} >
            Get a Quote
            </button>
            </div>

            {showQoute && (<Quote
              distance={distance}
              duration={duration}
              startDate={date+" "+time}
              selectedNumber={selectedNumber} 
              selectedCar={selectedCar}
               /> )}
    </div>
  )
}

const Quote=({distance,duration,startDate,selectedNumber,selectedCar })=>{
return(
<div className='quote'>
          <p> Price: £{Math.floor(parseInt(distance)*0.8)}</p>
          <p>Distance:{distance}</p>
          <p>Duration:{duration}</p>
          <p>Date:{startDate}</p>
          <p>Passengers:{selectedNumber}</p>
          <p>Type of Car:{selectedCar.type}</p>
          <button>Book Now</button>
</div>
);
};

export default GoogleApi
