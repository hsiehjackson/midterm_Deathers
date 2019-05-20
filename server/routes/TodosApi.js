var express = require("express");
var router = express.Router();
const Todos = require("../models/todos")
const Location = require("../models/location")



// ===Todos===================
// Fetch All Data
router.get("/todos", function (req, res) {
  Todos.find()
    .sort({date: 1})
    .then((todos) => res.json(todos));
})

// Save todos
router.post("/todos", function (req, res) {
  new Todos({
    //_id: req.body.todo._id,
    text: req.body.todo.text,
    date: new Date(req.body.todo.date),
    time: req.body.todo.time
  })
    .save()
    .then(result => res.json(result)) 
    //.then(console.log('Sucess add'));
})

// Delete todos
router.delete("/todos/:id", function (req, res) {
  Todos.findByIdAndRemove({ _id: req.params.id })
    .then(result => res.json(result)) 
    //.then(console.log('Sucess del'));
})

// Update todo
router.put("/todos", function (req, res) {
  Todos.findByIdAndUpdate(req.body._id, { complete: req.body.complete })
    .then(result => res.json(result)) 
    //.then(console.log('Sucess update'));
})


// ===Location===================
router.get("/location", function (req, res) {
  Location.find()
    .then((location) => res.json(location));
})

router.post("/location", function (req, res) {
  new Location({
    text: req.body.location,
    })
    .save()
    .then(result => res.json(result)) 
})

router.put("/location", function (req, res) {
  Location.findByIdAndUpdate(req.body._id, { text: req.body.text})
    .then(result => res.json(result)) 
    .then(console.log('Sucess update'));
})





module.exports = router