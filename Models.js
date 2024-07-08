const mongoose = require('mongoose'); // importing mongoose
const {Schema} = mongoose; // 

const sampleschema = new Schema({ // create a new Schema
    name:{type:String}, 
    age:{type:Number},
    userPhoto : {type:String}
})

module.exports = mongoose.model('collection',sampleschema)