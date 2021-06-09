const express = require('express')

const { getElementById, getIndexById, updateElement, seedElements, createElement } = require('./utils');

let animals = [];
seedElements(animals, 'animals');

const animalsRouter = express.Router();

//Get all animals
animalsRouter.get('/', (req, res, next) => {
    res.send(animals);
});

//get a single animal
animalsRouter.get('/:id', (req, res, next) => {
    const foundAnimal = getElementById(req.params.id, animals);
    if (foundAnimal) {
        res.send(foundAnimal);
    } else {
        res.status(404).send();
    }
});

//update animal
animalsRouter.put('/:id', (req, res, next) => {
    const foundAnimal = getIndexById(req.params.id, animals);
    if (foundAnimal !== -1) {
        updateElement(foundAnimal, req.query, animals);
        res.send(animals[foundAnimal]);
    } else {
        res.status(404).send();
    }
});

//create animal
animalsRouter.post('/', (req, res, next) => {
    const receivedAnimal = createElement('animals', req.query);
    if (receivedAnimal) {
        expressions.push(receivedAnimal);
        res.status(201).send(receivedAnimal);
    } else {
        res.status(400).send();
    }
});

//delete animal
animalsRouter.delete('/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});


