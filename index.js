const express=require('express');
const mongoose=require('mongoose');
let Person =require("./models/User.js")
require('dotenv').config();
const app = express();
const port = 4000;
mongoose.connect(process.env.db, {useNewUrlParser: true, useUnifiedTopology: true},(er)=>{
    if (er){
        console.log(er);
    }
    else 
    console.log('connected db')
})
app.use(express.json());
// get all users
app.get('/', async(req, res) =>{
    try {
        let persons= await Person.find({});
        res.send(persons)
        console.log('persons', persons)
        
    } catch (error) {
        console.error(error)
    }
    // res.json(persons)
 })

// ADD user
app.post('/user',async(req, res)=>{
    
        let user=new Person({
            name: req.body.name,
            age: req.body.age,
            date: Date.now()
        })
        try{	
            userSaved = await user.save();
            res.json(userSaved);
        }
        catch (err) {
            res.json({ message: err })
        }    
})
//Update user by id
app.put('/:id', async (req, res) => {
	try {
		let editedUser = await Person.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name,age:req.body.age } }, { new: true })
		res.json(editedUser)
	}
	catch (err) {
		res.json({ message: err })
	}
})


//delete 
app.delete('/:id', async (req,res) => {
	try{
		await Person.deleteOne({_id:req.params.id});
		res.send({message:"user deleted successfly"})
	}
	catch(err){
		res.json({message:err})
	}
})


//Patch 
/*app.patch('/:id', async(req,res)=>{
    try{
let update=Person.findOne({_id:req.params.id})
if(req.body.name){
    update.name= req.body.name
}
if(req.body.age)
{
    update.age=req.body.age;
}
edituser= await update.save();
res.send(edituser)
    }
    catch(err){
res.jeson({message:err});
    }
})*/



app.listen(port, function(){
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s', 
        port);
  });