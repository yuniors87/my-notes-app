const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sistemaSchema = new Schema({
  nombre: String,
  empresaId: String
});

module.exports = mongoose.model('Sistema', sistemaSchema);
