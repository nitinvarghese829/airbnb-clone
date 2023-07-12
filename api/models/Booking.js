const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookingSchema = new Schema({
    place: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Place'},
    user: {type: mongoose.Schema.Types.ObjectId, require: true},
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    name: String,
    email: String,
    mobile: Number,
    price: Number
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;