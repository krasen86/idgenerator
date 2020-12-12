var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

// Create new user
router.post('/generate-id', function(req, res) {
    if(req.body.email){
        User.find({email: req.body.email}, function(err, user){
            if(err){
                return res.status(409).json({'message': 'Not able to register user!', 'error': err});
            }
            if(user.length >= 1){
                user[0].requestsIdCounter +=1;
                user[0].save();
                return res.status(200).json(user[0]);
            }
            else{
                    var user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name || '',
                        email: req.body.email,
                        requestsIdCounter: 1,
                        phone: req.body.phone || 0,
                    });   
                    user.save(function(err, user) {
                        if (err) { return res.status(409).json({'message': 'User not found!', 'error': err}); }
                        res.status(201).json(user);
                    });
                }

        });
    }
    else {
        return res.status(409).json({
            message: 'Please provide email address'
        });
    }
});


module.exports = router;
