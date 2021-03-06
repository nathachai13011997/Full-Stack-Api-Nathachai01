const express = require("express");
const router = express.Router();
const { Posts, Likes, Users } = require("../models")

const { validateToken } = require('../middlewares/AuthMiddleware');


router.get("/", async (req, res)=>{
    const listOfPost = await Posts.findAll({ include: [Likes]});
    res.json(listOfPost);
});

router.get("/byId/:id", async (req, res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.get("/byuserId/:id", async (req, res)=>{
    const id = req.params.id;
    const listOfpost = await Posts.findAll({where: { UserId: id }, include: [Likes]});
    res.json(listOfpost);
});

router.post("/", validateToken, async (req, res)=>{
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res)=>{
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    res.json("DELETE SUCCESSFULLY");
})

module.exports = router;