const express = require('express');
const ideasRouter = express.Router();

const { 
    createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, 
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase 
} = require('./db.js');

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:id', (req, res, next) => {
    let returnedIdea = getFromDatabaseById('ideas', req.params.id)
    if (returnedIdea == null) {
        res.status(404).send('No such idea exists');
    }
    res.send(returnedIdea)
});

ideasRouter.put('/:id', (req, res, next) => {
    let seletedIdea = getFromDatabaseById('ideas', req.params.id);
    if (isNaN(req.params.id) == true){
        res.status(404).send('Not Found')
    } else if (seletedIdea == null){
        res.status(404).send('Not Found')
    } else {
        res.send(updateInstanceInDatabase('ideas', req.body));
    }
});

ideasRouter.post('/', (req, res, next) => {
    const ideasObject = req.body;
    const newIdeas = addToDatabase('ideas', ideasObject)
    res.status(201).send(newIdeas)
});

ideasRouter.delete('/:id', (req, res,next) => {
    const ideasDelete = deleteFromDatabasebyId('ideas', req.params.id);
    if (ideasDelete) {
        res.status(204).send();
    } else if (isNaN(req.params.id) == true){
        res.status(404).send();
    } else if (!ideasDelete) {
        res.status(404).send();
    }
});

module.exports = ideasRouter;
