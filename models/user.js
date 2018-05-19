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

UserSchema.methods.encryptPassword = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validPassword = candidatePassword => {
	return bcrypt.compareSync(candidatePassword, this.password);
}

const User = mongoose.model('users', UserSchema); 
module.exports = User;

