const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: String,
    description: String,
    duedate: {type:Date, required:true},
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
})