const db = require('../config/database');
Artwork = require('./Artwork');

const Category = db.sequelize.define('category', {
    // attributes
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ownerId: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: db.Sequelize.TEXT
        // allowNull defaults to true
    },
    image: {
        type: db.Sequelize.STRING,
    }
}, {
    // options
});

Category.belongsToMany(Artwork, {through: 'ArtworkCategory'});



module.exports = Category;