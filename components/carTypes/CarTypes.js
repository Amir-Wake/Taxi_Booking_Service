import React, { useState } from 'react';
import './Cars.css';
import { CarData } from './CarData';

function CarTypes({ handleCarSelect }) {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelect = (index) => {
    setSelectedCar(index);
    handleCarSelect(CarData[index]); // Pass the selected car data to the parent component
  };

  return (
    <div className='Card-Container' id='Cars'>
      <section className='contain'>
        <h1>Please select the type of car</h1>
        <div className='cars'>
          {CarData.map((car, index) => (
            <div key={index} className='car'>
              <h3 className='car-detail'>{car.type}</h3>
              <h6 className='car-detail'>{car.description}</h6>
              <p className='car-detail'>{car.passengers}</p>
              <p className='car-detail'>{car.bags}</p>
              <button
                className={`car-detail ${selectedCar === index ? 'selected' : ''}`}
                onClick={() => handleSelect(index)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CarTypes;
