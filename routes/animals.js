const express = require('express')
const router = express.Router()
const Animal = require('../models/animals')
//Getting all
router.get('/', async (req,res) => {
    try{
        const animals = await Animal.find()
        res.json(animals)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Getting One
router.get('/:id', getAnimal, (req, res) => {
    res.json(res.animal)
})

//Creating One
router.post('/', async (req, res) => {
    const animal = new Animal({
        name: req.body.name,
        breed: req.body.breed,
        size: req.body.size,
        description: req.body.description
    })
    try {
        const newAnimal = await animal.save()
        res.status(201).json(newAnimal)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//Updating One
router.patch('/:id', getAnimal, async (req, res) => {
    if(req.body.name != null){
        res.animal.name = req.body.name
    }
    if(req.body.breed != null){
        res.animal.breed = req.body.breed
    }
    try {
        const updatedAnimal = await res.animal.save()
        res.json(updatedAnimal)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

//Deleting One
router.delete('/:id', getAnimal, async (req, res) => {
    try{
        await res.animal.remove()
        res.json({ message: 'Deleted animal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAnimal(req,res, next){
    let animal
    try{
        animal = await Animal.findById(req.params.id)
        if (animal == null){
            return res.status(404).json({ message: 'cannot find animal' })
        }
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
    res.animal = animal
    next()
}

module.exports = router