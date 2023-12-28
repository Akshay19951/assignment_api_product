const jwt = require("jsonwebtoken");
const {secret_key} = require("../../config/secret");
const bcrypt = require("bcrypt");
const {
    getUserByUsername,
    createUser
} = require("../../models/user.model");

async function register(req, res){
    try {
        const {username, password} = req.body
        if(!username || !password)
            return res.status(400).json({msg: "Please provide valid credentials!!!"})
        const user = await getUserByUsername(username)
        if(user && user[0])
            return res.status(400).json({msg: "User already exists!"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {username, password: hashedPassword}
        const result = await createUser(data);

        return res.status(200).json({msg:"User registered successfull!", result})
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res){
    try {
        const {username, password} = req.body
        if(!username || !password)
            return res.status(400).json({msg: "Please provide valid credentials!!!"})
        const user = await getUserByUsername(username)
        
        if(!user || !user[0] || !(await bcrypt.compare(password, user[0].password)))
            return res.status(401).json({msg: "Unautherized user!!!"})

        const token = jwt.sign({ username }, secret_key, { expiresIn:'24h' });
        return res.status(200).json({msg:"Login successful!!", token})        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login
}