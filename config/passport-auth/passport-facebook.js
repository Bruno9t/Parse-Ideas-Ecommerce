const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../models');

passport.use(
    new FacebookStrategy({

        clientID: process.env.F_CLIENT_ID,
        clientSecret: process.env.F_CLIENT_SECRET,
        callbackURL:process.env.APP_URL + '/auth/access/facebook/redirect',
        fields:['id', 'email','profileUrl','photos', 'gender', 
        'locale', 'name', 'timezone', 'updated_time', 'verified'],

    }, async (accessToken, refreshToken, profile, done) => {
   
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