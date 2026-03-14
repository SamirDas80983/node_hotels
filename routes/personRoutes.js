const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// POST route to add a person
router.post('/', async (req, res) => {
  try {

    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET all persons
router.get('/', async (req, res) => {
  try {

    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET person by work type
router.get('/:workType', async (req, res) => {
  try {

    const workType = req.params.workType;

    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

      const response = await Person.find({ work: workType });

      console.log('response fetched');
      res.status(200).json(response);

    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person(first it will get the data then update)

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation. validation mean in the Person what are the required parameter it should check that.
    });

    if(!response){
      return res.status(404).json({error:'Person not found'});//the put will find the from the document id which have to update so if the document not present at that particular id so it show 404 status code person not found.
    }

    console.log('data updated');
    res.status(200).json(response);

  } catch (err) {
        console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    //Assuming you have a person model (req dega mean response bi lega)
    const response = await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:'Person not found'});//the put will find the from the document id which have to update so if the document not present at that particular id so it show 404 status code person not found.
    }

    console.log('data delete');
    res.status(200).json({message:'Person Deleted Successfully'});

  } catch (err) {
        console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;