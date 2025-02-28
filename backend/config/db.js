const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Solo conectarse si no hay una conexión activa
    if (mongoose.connection.readyState === 0) {  // Si no hay conexión activa
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB conectado: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error('Error al conectar con MongoDB', error);
    process.exit(1);  // Si hay un error, termina el proceso
  }
};

// Manejar la desconexión correcta al cerrar el servidor
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexión a MongoDB cerrada');
  process.exit(0);  // Termina el proceso correctamente
});

module.exports = connectDB;



