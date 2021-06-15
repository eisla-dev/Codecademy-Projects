const express = require('express');
const minionsRouter = express.Router();

const { 
    createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, 
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase 
    } = require('./db.js');

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const minionObject = req.body;
    const newMinion = addToDatabase('minions', minionObject)
    res.status(201).send(newMinion);
})

minionsRouter.get('/:id', (req, res, next) => {
    let returnedMinion = getFromDatabaseById('minions', req.params.id)
    if (returnedMinion == null){
        res.status(404).send('No such minion exists');
    }
    res.send(returnedMinion)
});

minionsRouter.put('/:id', (req, res, next) => {
    let selectedMinion = getFromDatabaseById('minions', req.params.id);
    if (isNaN(req.params.id) == true){
        res.status(404).send('Not Found')
    } else if (selectedMinion == null) {
        res.status(404).send('Not Found')
    } else {
        res.send(updateInstanceInDatabase('minions', req.body));
    } 
});

minionsRouter.delete('/:id', (req, res, next) => {
    const minionDelete = deleteFromDatabasebyId('minions', req.params.id);
    if (minionDelete) {
        res.status(204).send();
    } else if (isNaN(req.params.id) == true){
        res.status(404).send();
    } else if (!minionDelete) {
        res.status(404).send();
    }
});

module.exports = minionsRouter;
