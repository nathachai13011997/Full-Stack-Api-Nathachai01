const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware")

const { sign } = require('jsonwebtoken');


router.post("/", async (req, res)=>{
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash
        })
        res.json("SUCCESS");
    })
});

router.post("/login", async (req, res)=>{
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: {username: username}
    });

    if(!user) res.json({error: "Users Doesn't Exist"});

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match){
            res.json({error: "Wrong Username And Password Combination"});
        }else{
            const accessToken = sign({username: user.username, id: user.id},"Bank");
            res.json({token: accessToken, username: username, id: user.id});
        }
        
    })
})

router.get("/auth", validateToken, (req, res)=>{
        res.json(req.user);
})

router.get("/basicinfo/:id", async (req, res)=>{
    const id = req.params.id;
    const basicinfo = await Users.findByPk(id, {attributes: {exclude: ['password']}}); 
    res.json(basicinfo);
    
})

router.post("/byIduser", async (req, res)=>{
    const id = req.body.UserId;
    const basicinfo2 = await Users.findByPk(id, {attributes: {exclude: ['password']}}); 
    res.json(basicinfo2);
    
})

router.get("/", async (req, res)=>{
    const listOfUsers = await Users.findAll({attributes: {exclude: ['password']}});
    res.json(listOfUsers);
});

module.exports = router;