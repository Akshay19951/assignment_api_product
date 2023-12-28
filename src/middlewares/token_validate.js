const { get } = require("lodash")
const { secret_key } = require("../config/secret");
const {
    getUserByUsername
} = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next){
    try {
        const token = get(req, "headers.authorization", "").replace(
            /^Bearer\s/,
            ""
          );
        if(!token)
            return res.status(401).json({msg: "Unauthorized! blank string"})

        var decoded = jwt.verify(token, secret_key);
        if(!decoded || !decoded.username)
            return res.status(401).json({msg:"Unauthorized! wrong secret key"})

        const user = await getUserByUsername(decoded.username)
        if(!user || !user[0])
            return res.status(401).json({msg:"Unauthorized!"})
        
        return next()
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized!' });
    }
}

module.exports = {
    isAuthenticated
}