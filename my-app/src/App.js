import React, { useState } from 'react';
import RegionDropdown from './components/RegionDropdown';
import DistrictDropdown from './components/DistrictDropdown';
import StreetDropdown from './components/StreetDropdown';
import ProviderTable from './components/ProviderTable';
import '../src/style/styles.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [selectedProvider, setSelectedProvider] = useState([]);

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedDistrict('');
    setSelectedStreet('');
    setSelectedProvider('');
  };

  const handleDistrictSelect = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedStreet('');
    setSelectedProvider('');
  };

  const handleStreetSelect = (streetId) => {
    setSelectedStreet(streetId);
    setSelectedProvider('');
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
  }

  return (
    <div className='main'>
      <div className='selectors'>
        <div>
          <RegionDropdown onSelectRegion={handleRegionSelect} />
        </div>
        <div>
          {selectedRegion && <DistrictDropdown regionId={selectedRegion} onSelectDistrict={handleDistrictSelect} />}
        </div>
        <div>
        {selectedDistrict && <StreetDropdown districtId={selectedDistrict} onSelectStreet={handleStreetSelect} onSelectProvider={handleProviderSelect}  />}
        </div>
      </div>
      <div className='table'>
        {selectedStreet && <ProviderTable providerIds={selectedProvider} />}
      </div>
    </div>
  );
}

export default App;
