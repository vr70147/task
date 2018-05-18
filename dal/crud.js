const express = require('express');

const errorsArray = (req, res, next ) => {
	const errors = false
        res.send(errors);
        next();
    }
    const success = (req, res, next) => {
        const success = true;
        res.send(success);
        next();
    }

const MiddleWares = {
    errorsArray,
    success
};

module.exports = MiddleWares;