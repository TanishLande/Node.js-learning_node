const mongoose = require('mongoose');

const Schema = mongoose.Schema;


///we  create scheme here 
///schema is a structure of how we frame your database 
const schemapage = new Schema({
    title:{
        type: String,
        require: true
    },
    snippet:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true    
    }
} , { timestamps: true });


//model 
/// model is used to interact with databse in structure in schema 
const page = mongoose.model('page', schemapage);
module.exports = page;