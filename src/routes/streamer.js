const express = require('express')
const router = express.Router()
const Streamer = require('../models/streamerSchema')





router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const streamers = await Streamer.findOne({Id: id}).then((OneStreamer)=>{
        if(OneStreamer) {
            res.status(200).json(OneStreamer)
            
        }
        else {
            res.status(400).json({message: "This streamer does not exist"})
        }
      })
      
       
    }
    catch(error){
        console.error(error);
      res.status(500).json({ error: 'Error' });
    }
});


module.exports = router;