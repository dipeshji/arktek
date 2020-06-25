const express = require('express');

const passport = require('passport');
const router = express.Router();
const loginuser = require('../model/login');
var jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.get('/googleLogin', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/manualLogin', (req, res) => {
    let params = { password: req.query.pass, id: req.query.id }

    if (params.id !== 'undefined' && params.password !== 'undefined') {
        loginuser.Login_user(params)
            .then(user => {
                let token = jwt.sign({ user: user.Email }, 'secret')
                res.status(200).json({ "token": token, "status": true })
            }).catch(msg => {
                res.json(msg)
            })
    } else {
        res.json({ "status": false, msg: "Invalid Cradentials!!" });
    }
})


router.get('/authenticate', verifytoken, (req, res) => {
    loginuser.get_user(decodedtoken.user).then(user => {
        
        res.status(200).json({ "status": true, "user": user })
    })
});

router.get('/getall', (req,res)=>{
    loginuser.getall().then((user)=>{
        
        res.json(user);
    })
})

var decodedtoken = '';

function verifytoken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, 'secret', (err, tokendata) => {
        if (err) {
            res.json({ "status": false });
        } else {
            decodedtoken = tokendata;
            next();
        }
    })
}

module.exports = router;