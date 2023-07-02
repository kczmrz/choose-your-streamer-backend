const express = require('express')
const router = express.Router()
const Streamer = require('../models/streamerSchema')



/* Every streamer has a points. Points is a upvote - downvote (subtraction). The streamers list hierarchy is based on points */

/* POST streamer to database */

router.post('/', async (req, res) => {
  
   const newStreamer = new Streamer({   
      Id: req.body.Id,
      Nick: req.body.Nick,
      Platform: req.body.Platform,
      Image: req.body.Image,
      Description: req.body.Description,
      Upvotes: 0,
      Downvotes: 0,
      Points: 0
   })
   try {
    const PostStreamer = await newStreamer.save()
    const PostStreamerJSON = JSON.stringify(PostStreamer)
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.end(PostStreamerJSON)
   }
   catch(e){
    res.status(400).json(e);
   }
});




/* GET /streamers - get and sort all streamers (in database) */

router.get('/', async (req, res) => {
    try {
      const streamers = await Streamer.find().sort({Points: -1}).then((strmrs) => {
         res.status(200).json(strmrs);
         
       });
      
       
    }
    catch(error){
          console.error(error);
      res.status(500).json({ error: 'Error' });
    }
});



/* Downvote and Upvote - PUT */
router.put('/:id/upvote', async (req, res) => {
   const { id } = req.params;
   Streamer.findOne({Id: id}).then((element)=>{
     if(element)
     {
      element.Upvotes += 1;
      element.Points = element.Upvotes - element.Downvotes;
      return element.save();
     }
     else {res.status(404).json({ error: 'Element not found' });}
   }).then((updatedElement) => { res.json(updatedElement)})
   
})

router.put('/:id/downvote', async (req, res) => {
   const { id } = req.params;
   Streamer.findOne({Id: id}).then((element)=>{
     if(element)
     {
      element.Downvotes += 1;
      element.Points = element.Upvotes - element.Downvotes;
      return element.save();
     }
     else {res.status(404).json({ error: 'Element not found' });}
   }).then((updatedElement) => { res.json(updatedElement)})
   
})
module.exports = router;

