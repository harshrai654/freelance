const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    employer:{type:String, required:true, trim:true},
    freelancer: {type:String, required:false},
    description:{type:String, required:true, trim:true},
    amount:{type:Number, required:true, trim:true},
    remainingPayment:{type: Number, required:true, trim:true},
    deadline:{type:Number, required:true, trim:true},
    assigned:{type:Boolean, required:true, default:false},
    status:{type:String, required: true, default: 'PENDING'}
},{
    strict: false,
    timestamps:true,
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project