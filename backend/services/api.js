// services/api.js
const axios = require('axios');
const API_URL = process.env.API_URL; // URL de la API externa si es necesario

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = api;

