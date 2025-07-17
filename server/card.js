// Card.js
const mongoose = require('mongoose');

// Define the schema for your cardsData collection
const cardSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  imgdata: { type: String, required: true },
  address: { type: String, required: true },
  delimg: { type: String, required: true },
  somedata: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: String, required: true },
  arrimg: { type: String, required: true },
  qnty: { type: Number, default: 0 },
}, { collection: 'CardsData' });  // Explicitly specify the collection name

// Create the model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
