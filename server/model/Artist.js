const db = require('../config/database');
const Artwork = require('./Artwork');

const Artist = db.sequelize.define('artist', {
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
    fullName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    pseudo: {
        type: db.Sequelize.TEXT
        // allowNull defaults to true
    },
    bornDate: {
        type: db.Sequelize.DATE
    },
    deathDate: {
        type: db.Sequelize.DATE,
    },
    bio: {
        type: db.Sequelize.TEXT
    },
    image: {
        type: db.Sequelize.STRING,
    }
}, {
    // options
});


Artist.hasMany(Artwork);

module.exports = Artist;