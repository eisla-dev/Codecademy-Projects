const express = require('express');
const apiRouter = express.Router();

// DB Helper Functions
const { 
    createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, 
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase 
    } = require('./db.js');
/*
const validateMinion = (req, res, next) => {
    const newMinion = req.body;
    // Loop through minion properties to check if any are empty
    let propertyCount = 0
    for (const property in newMinion){
        propertyCount++;
    }
    console.log(propertyCount)
    next();
}
*/

// Get all minions
apiRouter.get('/minions', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

apiRouter.post('/minions', (req, res, next) => {
    const minionObject = req.body;
    const newMinion = addToDatabase('minions', minionObject)
    res.status(201).send(newMinion);
})

apiRouter.get('/minions/:id', (req, res, next) => {
    let returnedMinion = getFromDatabaseById('minions', req.params.id)
    if (returnedMinion == null){
        res.status(404).send('No such minion exists');
    }
    res.send(returnedMinion)
});

apiRouter.put('/minions/:id', (req, res, next) => {
    let selectedMinion = getFromDatabaseById('minions', req.params.id);
    if (isNaN(req.params.id) == true){
        res.status(404).send('Not Found')
    } else if (selectedMinion == null) {
        res.status(404).send('Not Found')
    } else {
        res.send(updateInstanceInDatabase('minions', req.body));
    } 
});

apiRouter.delete('/minions/:id', (req, res, next) => {
    const minionDelete = deleteFromDatabasebyId('minions', req.params.id);
    if (minionDelete) {
        res.status(204).send();
    } else if (isNaN(req.params.id) == true){
        res.status(404).send();
    } else if (!minionDelete) {
        res.status(404).send();
    }
});
    

// Get all ideas
apiRouter.get('/ideas', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

apiRouter.get('/ideas/:id', (req, res, next) => {
    let returnedIdea = getFromDatabaseById('ideas', req.params.id)
    if (returnedIdea == null) {
        res.status(404).send('No such idea exists');
    }
    res.send(returnedIdea)
});

// Get all meetings
apiRouter.get('/meetings', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

apiRouter.get('/meetings/:id', (req, res, next) => {
    let returnedMeetings = getFromDatabaseById('meetings', req.params.id)
    if (returnedMeetings == null) {
        res.status(404).send('No such idea exists');
    }
    res.send(returnedMeetings)
})
module.exports = apiRouter;
