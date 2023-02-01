import express from 'express'
import controller from '../controllers/message.js'

let router = express.Router()

// define the application paths 
router.post('/save', controller.save)
router.get('/messages', controller.getMessages)

export default router