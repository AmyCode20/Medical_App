const mongoose = require("mongoose");
const schema = mongoose.Schema();

const tokenSchema = new mongoose.Schema({
    _googleId: {type: mongoose.Schema.Types.ObjectId, required: true},
    _doctorId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor' },
    _patientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patient' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});
const Model = mongoose.model("TokenSchema", TokenSchema);
module.exports = Model;