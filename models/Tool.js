// models/Tool.js
const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Tool', ToolSchema);