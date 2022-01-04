const express = require("express");
const router = express.Router();
const { Likes } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res)=>{
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where: {
            UserId: UserId,
            PostId: PostId
        }
    })

    if(!found){
        await Likes.create({ PostId: PostId, UserId: UserId });
        res.json({Liked: true});
    }else{
        await Likes.destroy({
            where: {
                id: found.id
            }
        })
        res.json({Liked: false});
    }

});

module.exports = router;