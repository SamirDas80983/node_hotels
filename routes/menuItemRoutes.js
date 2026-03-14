const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// POST route to add a person
router.post('/', async (req, res) => {
  try {

    const data = req.body;

    const newItem = new MenuItem(data);

    const response = await newItem.save();

    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

router.get('/', async (req, res) => {
  try{

    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


router.get('/:tasteType', async (req, res) => {
  try {

    const tasteType = req.params.tasteType;

    if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {

      const response = await MenuItem.find({ taste: tasteType });

      console.log('response fetched');
      res.status(200).json(response);

    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id from the URL parameter
    const updatedMenuData = req.body; // Updated data for the person(first it will get the data then update)

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation. validation mean in the Person what are the required parameter it should check that.
    });

    if(!response){
      return res.status(404).json({error:'Menu not found'});//the put will find the from the document id which have to update so if the document not present at that particular id so it show 404 status code person not found.
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
    const menuId = req.params.id; // Extract the id from the URL parameter

    //Assuming you have a person model (req dega mean response bi lega)
    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!response){
      return res.status(404).json({error:'Menu not found'});//the put will find the from the document id which have to update so if the document not present at that particular id so it show 404 status code person not found.
    }

    console.log('data delete');
    res.status(200).json({message:'Menu Deleted Successfully'});
  } catch (err) {
        console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;