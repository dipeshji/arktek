const mongoose = require('mongoose');
var schema = mongoose.Schema;
const utils = require('../util/passenc');

var user_schema = new schema({
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Mobile_Number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
});

const userModel = module.exports = mongoose.model('registered_user', user_schema);

module.exports.register_user = ((userbody) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ Email: userbody.email })
            .exec((err, user) => {
                if (user) {
                    if (user.Name === userbody.name) {
                        reject({
                            "status": false,
                            "msg": `User with ${userbody.email} and ${userbody.name} already exist!!`
                        })
                    } else {
                        reject({
                            "status": false,
                            "msg": `User with ${userbody.email} already exist!!`
                        })
                    }
                } else {
                    utils.encryptpass(userbody.password)
                        .then(hash => {
                            let inuser = {
                                Name: userbody.name,
                                Password: hash,
                                Mobile_Number: userbody.mobile_number,
                                Email: userbody.email
                            }

                            userModel.create(inuser, (err, ruser) => {
                                if (ruser) {
                                    resolve({
                                        status: true,
                                        "msg": `User with user name ${ruser.Name} successfuly registered`,
                                        "user": ruser
                                    })
                                } else {
                                    reject({
                                        "status": false,
                                        "msg": "Error occured"
                                    })
                                }
                            })
                        })
                }
            })
    })
})
