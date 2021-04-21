const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applyRequestSchema = new Schema({
    project:{type:String, required:true, trim:true},
    freelancer:{type:String, required:true, trim:true},
},{
    timestamps:true,
})

applyRequestSchema.index({project:1, freelancer:1}, {unique: true});
const ApplyRequest = mongoose.model('ApplyRequest', applyRequestSchema)
module.exports = ApplyRequest