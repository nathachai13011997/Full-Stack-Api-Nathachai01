module.exports = (sequelize, DataTypes) =>{
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    });

    Posts.associate = (module) => {
        Posts.hasMany(module.Comments, {
            onDelete: "cascade",
        });

        Posts.hasMany(module.Likes, {
            onDelete: "cascade",
        });
    }

    return Posts;
}