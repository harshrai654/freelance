const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentRequestSchema = new Schema({
    project:{type:String, required:true, trim:true},
    employer: {type:String, required:true, trim:true},
    freelancer:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    amount:{type:Number, required:true, trim:true},
    locked:{type:Boolean, required:true, trim:true, default:true},
    paid:{type:Boolean, required:true, trim:true, default:false}
},{
    strict: false,
    timestamps:true,
})

const PaymentRequest = mongoose.model('PaymentRequest', paymentRequestSchema)
module.exports = PaymentRequest