const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models');
const {G_CLIENT_ID,G_CLIENT_SECRET,APP_URL} = process.env

passport.use(
    new GoogleStrategy({

        clientID: G_CLIENT_ID,
        clientSecret: G_CLIENT_SECRET,
        callbackURL: APP_URL + '/auth/access/google/redirect',

    }, async (accessToken, refreshToken, profile, done) => {

        const {id,provider,name,emails,photos} = profile
   
        const [user,created] = await User.findOrCreate({

            where:{ 
                provider_id:id ,
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