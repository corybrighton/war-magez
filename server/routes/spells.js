var router = require('express').Router()
var Spells = require('../models/spell')

//GET ALL
router.get('/api/spells', (req, res, next) => {
  Spells.find({})
    .then(spells => {
      res.status(200).send(spells)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/spells/:id', (req, res, next) => {
  Spells.findById(req.params.id)
    .then(spell => {
      res.status(200).send(spell)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/api/spells', (req, res, next) => {
  var spell = req.body
  Spells.create(spell)
    .then(newSpell => {
      res.status(200).send(newSpell)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/spells/:id', (req, res, next) => {
  Spells.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(spell => {
      res.status(200).send({ message: "Successfully Updated", spell })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/spells/:id', (req, res, next) => {
  Spells.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Deleted Spell")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = router
