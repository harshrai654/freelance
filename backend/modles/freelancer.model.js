const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')


const freelancerSchema = new Schema({
    first_name: {type:String, required:true, trim:true, minlength:3},
    last_name: {type:String, required:true, trim:true, minlength:3},
    password: {type:String, required:true, trim:true},
    email:{type:String, lowercase:true, required:true, unique:true, trim:true, validate:[validator.isEmail, 'Invalid email']},
    mobile:{type:String, required:true, unique:true, trim:true, validate:[validator.isMobilePhone, 'Invalid mobile']},
    ethereum_address: {type:String, required:true, trim:true},
},{
    timestamps:true,
})

const Freelancer = mongoose.model('Freelancer', freelancerSchema)
module.exports = Freelancer