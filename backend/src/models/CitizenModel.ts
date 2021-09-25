//for typescript to identify this file as module
export { };

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const citizenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currentName:{
        type: Schema.Types.ObjectId,
        ref: 'Name'
    },
    pastNames: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Name'
        }
    ]
})

module.exports = mongoose.model('Citizen', citizenSchema)
