const User = require('../model/User');
const jwt = require('jsonwebtoken');
const passport = require('../config/strategies');
const { transporter } = require('../config/smtp');
const { getPermission, usePasswordHashToMakeToken } = require('../service/security');
const { resetPasswordTemplate, getPasswordResetURL } = require('../email/reset-password');
const uploadImage = require('../config/imageStorage');


userController = {
    getOne: function(req, res, next) {
        User.findByPk(req.params.id).then(user => {
            const permission = getPermission('read', 'user', req.user, user.id);
            if (permission) {
              res.json({
                  status: "success",
                  message: "User retrieved successfully",
                  data: user
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
        User.findAll().then(users => {
            const permission = getPermission('read', 'user', req.user);
            if (permission) {
                res.json({
                    status: "success",
                    message: "Users retrieved successfully",
                    data: users
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
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.json({
                    status: "error",
                    message: "Sorry, that email is already used, reset your password if you forgot it",
                    data: null
                });
            } else {
                User.create({
                    firstName:  req.body.firstName,
                    lastName:   req.body.lastName,
                    email:      req.body.email,
                    password:   req.body.password,
                    role:       'USER'
                }).then(user => {
                    res.json({
                        status: "success",
                        message: "User added successfully",
                        data: user
                    });
                });
            }
        });
    },
    authenticate: function(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            console.log('user = ' + user + 'err = ' + err + ' ,  info =' + info);
            if (err || !user ) {
                return res.status(400).json({
                    status: "error",
                    message: "Could not authenticate",
                    data: { info: info }
                });
            } else {
                // generate a signed json web token with the contents of user object and return it in the response
                const token = jwt.sign(user, process.env.JWT_SECRET);
                return res.json({
                    status: "success",
                    message: "User authenticated successfully",
                    data: {user: user, token: token}
                });
            }
        })(req, res);
    },
    update: function (req, res, next) {
        const { firstName, lastName, email, password, role } = req.body;
        if (req.user) {
            // prevent password edition from this route, use specific new password route instead
            /* 
            if (req.body.password) {
                res.status(401).json({
                    status: "unauthorized",
                    message: "Sorry, password can't be modified from that route, use new password route",
                    data: '/auth/new-password'
                });
             } 
            */

            User.findByPk(req.params.id).then(user => {

                // get permission
                const permission = getPermission('update', 'user', req.user, user.id);

                if (permission) {
                    // handle avatar upload
                    let filePath = undefined;
                    if (req.file) {
                        const host = req.host;
                        filePath = req.protocol + "://" + host + '/' + req.file.path;
                    }
                    // update fields
                    user.firstName = firstName ? firstName : user.firstName;
                    user.lastName = lastName ? lastName : user.lastName;
                    user.email = email ? email : user.email;
                    user.password = password ? password : user.password;
                    user.role = role ? role : user.role;
                    user.avatar = filePath ? filePath : user.avatar;
                    user.save().then(user => {
                        res.json({
                            status: "success",
                            message: "User updated successfully",
                            data: user
                        }).catch(err => {
                            next(err);
                        })
                    });
                } else {
                    console.log('Permission Denied');
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
            User.findByPk(req.params.id).then(user => {
                if (!user) {
                    res.json({
                        status: "error",
                        message: "there is no user with that id",
                        data: null
                    });
                    throw new Error();
                } else {
                    const permission = getPermission('delete', 'user', req.user, user.id);
                    if (permission) {
                        res.json({
                            status: "success",
                            message: "User deleted successfully",
                            data: user
                        });
                        return user.destroy();
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
    resetPassword: function (req, res, next) {
        User.findOne({ where: { email: req.body.email }})
            .then(user => {
                const token = usePasswordHashToMakeToken(user);
                const url = getPasswordResetURL(user, token);
                const emailTemplate = resetPasswordTemplate(user, url);

                transporter.sendMail(emailTemplate, (err, info) => {
                    if (err) {
                        res.status(500).json({
                            status: "error",
                            message: "Error sending email",
                            data: null
                        })
                    }
                    console.log(`** Email sent **`, info || err)
                    res.json({
                        status: "success",
                        message: "Reset Password Mail sent",
                        data: null
                    })
                })
            }).catch(err => next(err))

    },
    newPassword: function (req, res, next) {
        const { id, token } = req.params;
        const { password } = req.body;
        User.findOne({ where: { id: id }})
            .then(user => {
                // decoding happens here because secret is different this time
                const secret = user.password + "-" + user.createdAt;
                const jwt_payload = jwt.decode(token, secret);
                if (jwt_payload.userId === user.id) {
                    User.findByPk(id).then(user => {
                        user.update({ password: password }).then(user => {
                            res.status(202).json({
                                status: "error",
                                message: "Error sending email",
                                data: user
                            })
                        }).catch(err => next(err))
                    })
                }
            })
            .catch(() => {
                res.status(401).json({
                    status: "unauthorized",
                    message: "Invalid user",
                    data: null
                })
            })
    }
};

module.exports = userController;