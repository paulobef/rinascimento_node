const db = require('../config/database');
const Artist = require('./Artist');
const Category = require('./Category');

const Artwork = db.sequelize.define('artwork', {
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
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: db.Sequelize.TEXT,
        // allowNull defaults to true
    },
    creationDate: {
        type: db.Sequelize.DATE,
    },
    dimensions: {
        type: db.Sequelize.STRING,
    },
    image: {
        type: db.Sequelize.STRING,
    }
}, {
    // options
});

Artwork.hasOne(Artist);
Artwork.belongsToMany(Category, {through: 'ArtworkCategory'});


module.exports = Artwork;