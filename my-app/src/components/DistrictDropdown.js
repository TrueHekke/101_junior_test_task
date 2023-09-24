import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistrictDropdown = ({ onSelectDistrict, regionId }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/districts/${regionId}`).then((response) => {
        setDistricts(response.data);
    });
  }, []);

  const handleRegionChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    onSelectDistrict(districtId);
  };

  return (
    <div>
      <label>Select District:</label>
      <select value={selectedDistrict} onChange={handleRegionChange}>
        <option value="">Select</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictDropdown;