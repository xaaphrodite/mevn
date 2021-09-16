module.exports = (sequelize, Sequelize) => {
    //
    const STRING = Sequelize.STRING;
    const INTEGER = Sequelize.INTEGER;

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: STRING(32),
            unique: true,
        },
        firstname: {
            type: STRING(32),
            defaultValue: "",
        },
        lastname: {
            type: STRING(32),
            defaultValue: "",
        },
        email: {
            type: STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        },
        password: {
            type: STRING(255),
        },
        phone: {
            type: STRING(15),
            defaultValue: "",
        },
        bio: {
            type: STRING(255),
            defaultValue: "Hello!",
        },
        address: {
            type: STRING(255),
            defaultValue: "",
        },
        address2: {
            type: STRING(255),
            defaultValue: "",
        },
        zipCode: {
            type: STRING(10),
            defaultValue: "",
        },
        age: {
            type: STRING(5),
        },
        gender: {
            type: STRING(12),
        },
        privilege: {
            type: STRING(6),
            allowNull: false,
            defaultValue: "Member",
        },
        status: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        verified: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        usernameChange: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        permit: {
            type: STRING(10),
        },
        exp: {
            type: STRING(255),
        },
        exp1: {
            type: STRING(255),
        },
        photoURL: {
            type: STRING,
            allowNull: false,
            defaultValue: "/uploads/images/defaultAvatarcrop.png",
        },
        backgroundURL: {
            type: STRING,
            allowNull: false,
            defaultValue: "/assets/img/keyboardCyan.jpg",
        },
    });

    return User;
};
