//for typescript to identify this file as module
export { };

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const nameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    citizen: {
        type: Schema.Types.ObjectId,
        ref: 'Citizen'
    },
    startDate: {
        type: Date,
    },
    endDate:{
        type: Date,
        default: null
    }
},
    { timestamps: true },
    { typeKey: '$type' }

)

module.exports = mongoose.model('Name', nameSchema)