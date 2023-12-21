const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

app.post('/register',async (req, res)=>{
    // To post / insert data into database
try {
    const {email, password} = req.body;
    await FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
} catch (error) {
    console.log(error);
}
    
})

app.post('/login',async (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;

    try {
        FormDataModel.findOne({email: email})
        .then(user => {
            if(user){
                // If user found then these 2 cases
                if(user.password === password) {
                    res.json("Success");
                }
                else{
                    res.json("Wrong password");
                }
            }
            // If user not found then 
            else{
                res.json("No records found! ");
            }
        })
    } catch (error) {
        console.log(error);
    }

   
})

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});