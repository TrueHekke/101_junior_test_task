import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderTable = ({ providerIds }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uniqueProviderIds = Array.from(new Set(providerIds));

    if (uniqueProviderIds.length > 0) {
      const requests = uniqueProviderIds.map((providerId) =>
        axios.get(`http://localhost:3001/api/providers/${providerId}`)
      );

      Promise.all(requests)
        .then((responses) => {
          const allProviders = responses.map((response) => response.data);
          setProviders(allProviders.flat());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching providers:", error);
          setLoading(false);
        });
    } else {
      setProviders([]);
      setLoading(false);
    }
  }, [providerIds]);

  return (
    <div className='table-main'>
      {loading ? (
        <p>Loading...</p>
      ) : providers.length === 0 ? (
        <p>No providers available for selected providers.</p>
      ) : (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>ID</th>
              <th>Region ID</th>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider, index) => (
              <tr key={provider.id}>
                <td>{index + 1}</td>
                <td>{provider.id}</td>
                <td>{provider.region_id}</td>
                <td>{provider.name}</td>
                <td>{provider.url_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default ProviderTable;