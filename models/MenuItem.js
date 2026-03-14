const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
},

price: {
  type: Number,
  required: true,
},

taste: {
  type: String,
  enum: ['sweet', 'spicy', 'sour'],   //enum mean what's the taste
  required: true,
},

is_drink: {
  type: Boolean,
  default: false  //default mean if client send data true so that is true and if client does not send any data then that is by default false
},
ingredients: {
  type: [String],
  default: []
},
num_sales: {
  type: Number,
  default: 0 //if we start a new dish so why user click it again and again si its default sell will be 0 then later it will be updated
}
})

const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem;