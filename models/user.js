const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    fname: String,
    lname: String
})

const User = mongoose.model('users', UserSchema); 
module.exports = User;