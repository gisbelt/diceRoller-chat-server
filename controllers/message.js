import Message from '../models/message.js'

let controller = {
    // function to save messages
    save: (req, res) => {
        let params = req.body // message content
        let message = new Message()
        message.message = params.message
        message.from = params.from

        // save database 
        message.save((error, messageStored) => {
            // if we have an error or the message has not been saved 
            if( error || !messageStored ) {
                return res.status(404).send({
                    status: 'error',
                    message: 'it has not been possible to save message'
                })
            }

            return res.status(200).send({
                status: 'success',
                messageStored
            })
        })
    },

    // function to get messages 
    getMessages: (req, res) => {
        // consult
        let query = Message.find({})
        query.sort('-_id').exec((error, messages) => {
            if(error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error while extracting data'
                }) 
            }
            if(!messages) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no messages to display'
                }) 
            }

            return res.status(200).send({
                status: 'success',
                messages
            })
        })
    }
}

export default controller