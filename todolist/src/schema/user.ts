const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    ownedTasks:Array<String>(),
    sharedTasks:Array<String>()
});

module.exports = mongoose.model('User', userSchema);