var express = require('express');
var router = express.Router();
const mongodb = require('mongodb'); 
var configDb = require('../config/database.js')
const car = 'sensor';
const light = 'light'; 

async function loadCollection(col){
  const client = await mongodb.MongoClient.connect(configDb.url,
    {
      useNewUrlParser: true
    }); 
  
  return client.db('luz').collection(col); 
}

/* GET home page. */
router.get('/light/', async(req, res, next)=>{

  const data = await loadCollection(light);
  res.send(await data.find({Last: 1}).toArray());
});

router.get('/sensor/', async(req, res, next)=>{
  const data = await loadCollection(car);
  res.send(await data.find({}).toArray()); 
})

router.post('/sensor/', async(req, res, next)=>{
  const data = await loadCollection(car);
  var date = new Date();
  date.setHours(date.getHours() -6); 
  await data.insertOne({
    Proximity: parseFloat(req.body.Proximity).toFixed(2),
    Temperature: parseFloat(req.body.Temperature).toFixed(2),
    Humidity: parseFloat(req.body.Humidity).toFixed(2),
    Date: date
  }); 
  res.status(201).send(); 
}); 

router.post('/light/', async(req, res, next)=>{
  const data = await loadCollection(light);
  await data.update({Id: parseInt(req.body.Id)},
  {$set: {Last:0}},
  {multi: true});
  await data.insertOne({
    Id: parseInt(req.body.Id),
    Y: parseInt(req.body.Y),
    X: parseInt(req.body.X),
    Intensity: parseInt(req.body.Intensity),
    Last: 1
  });
  res.status(201).send();
});

module.exports = router;
