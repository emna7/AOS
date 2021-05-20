import mongoose from "mongoose"; 

const taskSchema = new mongoose.Schema({
    name:String,
    comments:String,
    status:Boolean,
    owner:String,
    sharedWith:Array<String>()
});

module.exports = mongoose.model('Task', taskSchema);