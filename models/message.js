import mongoose from "mongoose";
let Schema = mongoose.Schema

let MessageSchema = new Schema({
    message: String, 
    from: String
})

export default mongoose.model('Message', MessageSchema)