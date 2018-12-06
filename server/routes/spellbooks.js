let router = require('express').Router()
let Spellbooks = require('../models/spellbook')

//GET ALL
router.get('/api/spellbooks', (req, res, next) => {
  Spellbooks.find({ creatorId: req.session.uid }).populate('spells').exec((err, spellbooks) => {
    if (spellbooks) {
      return res.status(200).send(spellbooks)
    }
    res.status(400).send({ error: err || "Bad Request" })
  })
})

router.get('/api/spellbooks/:id', (req, res, next) => {
  Spellbooks.findOne({ creatorId: req.session.uid, _id: req.params.id }).populate('spells').exec((err, spellbook) => {
    if (spellbook) {
      return res.status(200).send(spellbook)
    }
    res.status(400).send({ error: err || "Bad Request" })
  })
})

router.post('/api/spellbooks', (req, res) => {
  req.body.creatorId = req.session.uid
  Spellbooks.create(req.body)
    .then(newSpellbook => {
      res.status(200).send(newSpellbook)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/api/spellbooks/:id', (req, res) => {
  req.body.creatorId = req.session.uid
  Spellbooks.findOneAndUpdate({ creatorId: req.session.uid, _id: req.params.id }, req.body, { new: true })
    .then(spellbook => {
      if (spellbook) {
        return res.send(spellbook)
      }
      return res.status(400).send({ error: "Bad Request" })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})


router.delete('/api/spellbooks/:spellbookId', (req, res) => {
  Spellbooks.findById(req.params.spellbookId)
    .then(spellbook => {
      if (!spellbook || spellbook && spellbook.creatorId != req.session.uid) {
        return res.status(401).send({ error: 'Cannot Delete Spellbooks that are not yours' })
      }
      spellbook.remove(() => {
        res.status(200).send({ message: 'DELORTED' })
      })
    })
})

module.exports = router