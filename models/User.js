const mongoose=require('mongoose');
let Newschema= mongoose.Schema({
    name : {
        type : String,
    required : true,
},
age :{
    type :Number,
},
date : {
    type : Date,
    required : true,
    default : Date.now
}

}) 
module.exports=mongoose.model('Person', Newschema);