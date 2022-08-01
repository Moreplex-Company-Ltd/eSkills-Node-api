const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


// jwt options
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY || 'secretekey1234'
}


const strategy = new JWTStrategy(options, async(payload, done) => {
    // payload contains all info used to sign the token
    // console.log(payload.type)

    // check and append account type to the req.. accessed by req.user

    // console.log(payload)
    try {
        // just append user object to the req
        done (null, {...payload})
        // // if user, append user
        // if(payload.role === 'USER'){
        //     const user ={
        //         ... payload
        //     }
        //     done(null, {user})
        // }
        
        // // if admin, append admin
        // if(payload.type === 'ADMIN'){
        //     const admin ={
        //         ... payload
        //     }
        //     done(null, {admin})
        // }

        
        




    } catch (error) {
        console.log('ooop')
        console.log(error)
        done(error)
    }
})

passport.use('jwt', strategy )


module.exports = passport;