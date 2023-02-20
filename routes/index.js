const express = require('express')
const router = express.Router()

const getTicketComments = require('../controllers/getTicketComments')
const getGpt3Summary = require('../controllers/getGpt3Summary')
const getGpt3Triage = require('../controllers/getGpt3Triage')
const updateTicket = require('../controllers/triageTicket')
const addTicketComment = require('../controllers/addTicketComment')

router.get('/summarize', async function (req, res, next) {
  try {
    const ticketId = req.query.id
    const comments = await getTicketComments(ticketId)
    const summary = await getGpt3Summary(comments)
    await addTicketComment(ticketId, summary)

    res.status(200).send('success')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post('/triage', async function (req, res, next) {
  try {
    const ticketId = req.body.ticket_id
    const comments = await getTicketComments(ticketId)
    const summary = await getGpt3Triage(comments)
    await updateTicket(ticketId, summary)

    res.status(200).send('success')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router
