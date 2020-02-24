const Artwork = require('../model/Artwork');
const jwt = require('jsonwebtoken');
const passport = require('../config/strategies');
const { getPermission } = require('../service/security');

artworkController = {
    getOne: function(req, res, next) {
        Artwork.findByPk(req.params.id).then(artwork => {
            const permission = getPermission('read', 'artwork', req.artwork, artwork.id);
            if (permission) {
                res.json({
                    status: "success",
                    message: "Artwork retrieved successfully",
                    data: artwork
                })
            } else {
                console.log('Permission Denied');
                res.status(401).json({
                    status: 'unauthorized',
                    message: "Permission Denied : sorry, you do not have enough rights to access this route, contact an admin",
                })
            }
        })
    },
    getAll: function(req, res, next) {
        Artwork.findAll().then(artworks => {
            const permission = getPermission('read', 'artwork', req.artwork);
            if (permission) {
                res.json({
                    status: "success",
                    message: "Artworks retrieved successfully",
                    data: artworks
                })
            } else {
                console.log('Permission Denied');
                res.status(401).json({
                    status: 'unauthorized',
                    message: "Permission Denied : sorry, you do not have enough rights to access this route, contact an admin",
                })
            }
        })
    },
    create: function(req, res, next) {
        if (req.user) {
            Artwork.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: 'ARTWORK'
            }).then(artwork => {
                res.json({
                    status: "success",
                    message: "Artwork added successfully",
                    data: artwork
                });
            });
        }
    },

    update: function (req, res, next) {
        if (req.user) {
            Artwork.findByPk(req.params.id).then(artwork => {
                const permission = getPermission('update', 'artwork', req.artwork, artwork.id);
                if (permission) {

                    artwork.update(
                        // TODO: add fields to update
                    ).then(artwork => {
                        res.json({
                            status: "success",
                            message: "Artwork updated successfully",
                            data: artwork
                        }).catch(err => {
                            next(err);
                        })
                    });

                } else {
                    console.log('Permission Denied')
                    res.status(401).json({
                        status: 'Permission Denied',
                        message: "Sorry, you do not have enough rights, contact an admin",
                    })
                }
            }).catch(err => {
                console.log(err);
                next(err);
            })

        }

    },
    delete: function (req, res, next) {
        if (req.user) {
            Artwork.findByPk(req.params.id).then(artwork => {
                if (!artwork) {
                    res.json({
                        status: "error",
                        message: "there is no artwork with that id",
                        data: null
                    });
                    throw new Error();
                } else {
                    const permission = getPermission('delete', 'artwork', req.artwork, artwork.id);
                    if (permission) {
                        res.json({
                            status: "success",
                            message: "Artwork deleted successfully",
                            data: artwork
                        });
                        return artwork.destroy();
                    } else {
                        console.log('Permission Denied');
                        res.status(401).json({
                            status: 'Permission Denied',
                            message: "Permission Denied : sorry, you do not have enough rights to access this route, contact an admin",
                        })
                    }
                }

            }).catch(err => {
                next(err);
            })
        }
    },
};

module.exports = artworkController;