const mongoose = require('mongoose');

//Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //mean if a person does not fill the name part then it is used for mandatory to fill the name part
    },
    age:{
        type:Number
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager'],
        required: true 
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //email id should be unique no anyone uses same email double
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
});

//From this schema we make model and by using the model we will perform the database operation like crud
const Person = mongoose.model('Person',personSchema);
module.exports = Person;