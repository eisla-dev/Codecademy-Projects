const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions.js');
const ideasRouter = require('./ideas.js');
const meetingsRouter = require('./meetings.js');

// DB Helper Functions
const { 
    createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, 
    updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase 
    } = require('./db.js');

// Use the minionsRouter
apiRouter.use('/minions', minionsRouter);
   
// Use the ideasRotuer
apiRouter.use('/ideas', ideasRouter);

// Use the meetingsRouter 
apiRouter.use('/meetings', meetingsRouter);

//apiRouter.get('/meetings/:id', (req, res, next) => {
//    let returnedMeetings = getFromDatabaseById('meetings', req.params.id)
//    if (returnedMeetings == null) {
//        res.status(404).send('No such idea exists');
//    }
//    res.send(returnedMeetings)
//})
//
module.exports = apiRouter;
