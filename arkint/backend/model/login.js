const util = require('../util/passenc');
const userModel = require('../model/register');
const moongose = require('mongoose');
const schema = moongose.Schema;


const userSchema = new schema({
    authtoken: {
        type: String
    },
    userName:{
        type:String
    }
});

const user = module.exports = moongose.model('users', userSchema);


async function Login_user(userbody) {
    
    let hash = await get_hash(userbody)
    if (hash) {
        let status = await util.decryptpass(userbody.password, hash.Password)
        return new Promise((resolve, reject) => {
            if (status) {
                resolve(hash)
            } else {
                reject({
                    "msg": "Incorrect Credentials!!",
                    "status": false
                })
            }
        })
    } else {
        return new Promise((resolve, reject) => {
            reject({
                "msg": `${userbody.id} dosent exists`,
                "status": false
            })
        })
    }
};

module.exports.get_user = (user) => {
    return userModel.findOne({ Email: user }).exec();
};

module.exports.getall = () =>{
    return userModel.find().exec();
}

get_hash = (userbody => {
    return userModel.findOne({ Email: userbody.id })
        .exec()
});

module.exports.Login_user = Login_user;

