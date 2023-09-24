import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StreetDropdown = ({ onSelectStreet, districtId, onSelectProvider }) => {
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState('');


  useEffect(() => {
    axios.get(`http://localhost:3001/api/streets/${districtId}`).then((response) => {
        setStreets(response.data);
    });
  }, []);

  const handleStreetChange = (e) => {
    const streetId = e.target.value;
    setSelectedStreet(streetId);
    onSelectStreet(streetId);

    axios.get(`http://localhost:3001/api/provider_to_houses/${streetId}`).then((response) => {
      const data = response.data.map((item) => item.providerId);
      onSelectProvider(data);
    })
    .catch((error) => {
      console.error("Error fetching providerId:", error);
    });
  };

  return (
    <div>
      <label>Select Street:</label>
      <select value={selectedStreet} onChange={handleStreetChange}>
        <option value="">Select</option>
        {streets.map((street) => (
          <option key={street.id} value={street.id}>
            {street.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StreetDropdown;