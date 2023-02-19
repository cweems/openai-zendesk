const express = require('express');
const router = express.Router();

const getTicketComments = require('../controllers/getTicketComments');
const getGpt3Summary = require('../controllers/getGpt3Summary');
const updateTicket = require('../controllers/updateTicket');

router.get('/transfer', async function(req, res, next) {

  try {
    const ticketId = req.query.id;
    const comments = await getTicketComments(ticketId);
    const summary = await getGpt3Summary(comments);
    await updateTicket(ticketId, summary);
  
    res.status(200).send('some text');
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  } 
});

module.exports = router;
