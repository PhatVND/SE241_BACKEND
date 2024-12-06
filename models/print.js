const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const printerSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    Name: String,
    Location: String,
    status: { type: String, default: 'On' }
});

printerSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('printerass', printerSchema, 'printer');