const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../models');
const {F_CLIENT_ID,F_CLIENT_SECRET,APP_URL} = process.env

passport.use(
    new FacebookStrategy({

        clientID: F_CLIENT_ID,
        clientSecret: F_CLIENT_SECRET,
        callbackURL: APP_URL + '/auth/access/facebook/redirect',
        profileFields:['id','emails','photos','name'],
        enableProof: true

    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile)

        const {id,provider,name,emails,photos} = profile
   
        const [user,created] = await User.findOrCreate({

            where:{ 
                provider_id:id,
                provider,
            },

            defaults:{                
                nome:name.givenName,
                sobrenome:name.familyName,
                email:emails[0].value,
                senha:'',
                thumbnail:photos[0].value,
            }
        })

    done(null, user)
        
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
        done(null, user);
    });
});

module.exports = passport