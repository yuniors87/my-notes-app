const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  nombre: String
});

module.exports = mongoose.model('Empresa', empresaSchema);
