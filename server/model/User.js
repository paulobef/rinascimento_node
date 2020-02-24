const db = require('../config/database');
const bcrypt = require('bcrypt');



const User = db.sequelize.define('user', {
    // attributes
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: db.Sequelize.STRING
        // allowNull defaults to true
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: db.Sequelize.ENUM('USER', 'ADMIN'),
        allowNull: false
    },
    avatar: {
        type: db.Sequelize.STRING,
    }
}, {
    // options
});


// hooks
const salt = 10;
User.beforeCreate((user, options) => {
    // encrypt password before saving
    return bcrypt.hash(user.password, salt)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
});


module.exports = User;