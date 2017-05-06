/**
 * Created by Sam-Mac on 4/10/17.
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = (passport) => {
    console.log("passport by id");
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeader();
    ops.secretOrKey = config.secret;
    passport.use(new JwtStrategy(ops,(jwt_payload,done)=>{
        User.getUserById(jwt_payload._doc._id, (err,user) => {
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }));
}