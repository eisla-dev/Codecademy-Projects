const express = require('express');
const meetingsRouter = express.Router();

const {
    createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase,
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase
} = require('./db.js');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.get('/:id', (req, res, next) => {
    let returnedMeeting = getFromDatabaseById('meetings', req.params.id)
    if (returnedMeeting == null){
        res.status(404).send('No such meeting exists');
    }
    res.send(returnedMeeting)
});

meetingsRouter.put('/:id', (req, res, next) => {
    let seletedMeeting = getFromDatabaseById('meetings', req.params.id);
    if (isNaN(req.params.id) == true){
        res.status(404).send('Not Found')
    } else if (seletedMeeting == null) {
        res.status(404).send('Not Found')
    } else {
        res.send(updateInstanceInDatabase('meetings', req.body));
    }
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeetingObject = createMeeting();
    const newMeeting = addToDatabase('meetings', newMeetingObject);
    res.status(201).send(newMeeting)
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleteMeetings = deleteAllFromDatabase('meetings');
    if (deleteMeetings !== null) {
        res.status(204).send('No Content');
    } else {
        res.status(404).send('Not Found');
    }
});

module.exports = meetingsRouter;
