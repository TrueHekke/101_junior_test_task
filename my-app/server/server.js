const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const regionsData = require('./data/regions');
const districtsData = require('./data/districts');
const streetsData = require('./data/streets');
const providersData = require('./data/providers');
const providersToHousesData = require('./data/provider_to_houses');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

app.get('/api/regions', (req, res) => {
  res.json(regionsData);
});

app.get('/api/districts/:regionId', (req, res) => {
  const regionId = parseInt(req.params.regionId);
  const filteredDistricts = districtsData.filter(district => district.regionId === regionId);
  res.json(filteredDistricts);
});

app.get('/api/streets/:districtId', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const filteredStreets = streetsData.filter(street => street.district.id === districtId);
  res.json(filteredStreets);
});

app.get('/api/provider_to_houses/:streetId', (req, res) => {
  const streetId = parseInt(req.params.streetId);
  const providersForStreet = providersToHousesData.filter(providerToHouse => providerToHouse.streetId === streetId);
  res.json(providersForStreet);
});

app.get('/api/providers/:providerId', (req, res) => {
  const providerId = parseInt(req.params.providerId);
  const providers = providersData.filter(provider => provider.id === providerId);
  res.json(providers);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});