const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models');

passport.use(
    new GoogleStrategy({

        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        callbackURL:process.env.APP_URL + '/auth/access/google/redirect',

    }, async (accessToken, refreshToken, profile, done) => {

        // console.log(profile)
   
        const [user,created] = await User.findOrCreate({

            where:{ 
                provider_id:profile.id ,
                provider:profile.provider 
            },

            defaults:{                
                nome:profile.name.givenName,
                sobrenome:profile.name.familyName,
                email:profile.emails[0].value,
                senha:'',
                thumbnail:profile.photos[0].value,
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