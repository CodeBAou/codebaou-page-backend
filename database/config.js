const mongoose = require('mongoose');

const Conexiondb= async () => {
    await mongoose.connect(process.env.MONGO_URI, {})
    .then(()=> console.log('conexion mongo OK')) 
    .catch(e => console.log('error de conexión', e))
}

module.exports = { Conexiondb}

