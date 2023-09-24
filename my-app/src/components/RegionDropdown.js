import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegionDropdown = ({ onSelectRegion }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/regions').then((response) => {
      setRegions(response.data);
    });
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    onSelectRegion(regionId); 
  };

  return (
    <div>
      <label>Select Region:</label>
      <select value={selectedRegion} onChange={handleRegionChange}>
        <option value="">Select</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionDropdown;