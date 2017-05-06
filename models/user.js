/**
 * Created by Sam-Mac on 4/10/17.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    formSubmitInformation: []
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.addFormInformation = (information,user,callback) => {
    console.log(user);
    User.findByIdAndUpdate(user,{$push: {"formSubmitInformation": information}},(err,data)=>{
        if(err){
            console.log("Error in adding information");
        }
    });
    callback();
};

module.exports.getInformationForDashboard = (name,callback)=>{
    //User.find(callback);
    console.log(name);
    const query = { name: name };
    User.findOne(query,callback);
};

module.exports.getUserByUserName = function(username,callback){
    const query = { username: username };
    User.findOne(query,callback);
};

module.exports.addUser = (newUser,callback)=>{
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
            if(err){
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};



module.exports.comparePassword = (candidatePassword, hash, callback)=>{
    bcrypt.compare(candidatePassword,hash,(err,ismatch)=>{
        if(err){
            throw err;
        }
        callback(null,ismatch);
    })
}