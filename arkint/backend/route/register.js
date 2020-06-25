const express = require('express');
const router = express.Router();
const registeruser = require('../model/register');
const multer = require('multer')
var upload = multer()


router.post('/registeruser' ,upload.none(), (req, res) => {
    registeruser.register_user(req.body)
        .then((resbody) => {
            res.status(201).json(resbody)
        })
        .catch(resbody => {
            res.json(resbody)
        })
})

module.exports = router;