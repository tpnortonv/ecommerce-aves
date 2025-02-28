const Stripe = require('stripe');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de Stripe usando la clave secreta
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;

