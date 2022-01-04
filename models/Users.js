module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Users.associate = (module) => {
        Users.hasMany(module.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(module.Posts, {
            onDelete: "cascade",
        });
    }

    return Users;
}