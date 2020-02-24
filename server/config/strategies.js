const strategies = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../model/User');

// Local Strategy
strategies.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        return User.findOne({ where: { email: email }, raw: true})
            .then(user => {
                if (!user) {
                    console.log('user or password don\'t match');
                    return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) {
                    console.log('user or password don\'t match');
                    return done(null, false); }
                console.log('local strategy successful');

                return done(null, user);


            })
            .catch(err => done(err));
    }
));


// JWT Strategy
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

strategies.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ where: { id: jwt_payload.id } }, { raw: true }).then((user, err) => {
        if (err) {
            console.log('auth error : '+ err);
            return done(err, false);
        }
        if (user) {
            console.log('user found');
            return done(null, user);
        } else {
            console.log('user not found');
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = strategies;



