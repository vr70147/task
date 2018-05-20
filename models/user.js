const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: String,
    password: String,
    fname: String,
    lname: String
})

UserSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validPassword = function(candidatePassword){
    if(this.password != null) {
        return bcrypt.compareSync(candidatePassword, this.password);
    }
    else {
        return false
    };
};

const User = mongoose.model('users', UserSchema); 
module.exports = User;

