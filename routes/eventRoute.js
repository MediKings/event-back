import express from 'express'
import { createCategory, createEvent, followEvent, getCategories, getEmails, getEventByUser, getEvents, getFollowedEvent, getHomeEvents, getOneEvent, subscribe } from '../controllers/eventController.js'

const router = express.Router()

router.post('/category', createCategory)
router.get('/categories', getCategories)

router.post('/event', createEvent)
router.get('/events', getEvents)
router.get('/eventsHome', getHomeEvents)
router.get('/event/:id', getOneEvent)
router.get('/myEvents/:id', getEventByUser)

router.post('/followEvent', followEvent)
router.get('/getFollowedEvent/:id', getFollowedEvent)

router.post('/subscribe', subscribe)
router.get('/getEmails', getEmails)

export default router
