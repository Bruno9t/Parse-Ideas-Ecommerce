const createError = require('http-errors');
const express = require('express');
const {resolve,basename} = require('path')
const thumbPath = resolve('public','images','uploads')
const {readdirSync} = require('fs')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override')
const passport= require('passport')


const routesPath = resolve('routes')
let useFiles = {}

// const indexRouter = require('./routes/index');
// const announcementsRouter = require('./routes/announcements');
// const accessRouter = require('./routes/auth');
// const planRouter = require('./routes/plans');
// const adminRouter = require('./routes/admin');
// const userRouter = require('./routes/user');
// const messageRouter = require('./routes/message');
// const forgotPassword = require('./routes/forgotPassword')
// const resetPassword = require('./routes/resetPassword')



readdirSync(routesPath)
    .forEach(file=>{
        useFiles[file.split('.')[0]] = require(resolve(routesPath,file))
})

const app = express();

// view engine setup
app.set('views', resolve('views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve('public')));
app.use(methodOverride('_method'))

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:true,
  saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',function(req,res,next){

  let user = req.user || req.session.user


  if(user){

    let {id_usuario,thumbnail} = user

    let base = basename(thumbnail)
    let listPath = readdirSync(thumbPath)

    if(!listPath.includes(base)){

      thumbnail = '/images/svg/profile-user.svg'
    }

    res.locals.user = {
      id_usuario,
      thumbnail
    }
    return next()
  }

  return next()
})

// app.use(forgotPassword)
// app.use(resetPassword)
// app.use('/', indexRouter);
// app.use('/announcements', announcementsRouter);
// app.use('/auth', accessRouter);
// app.use('/plans', planRouter);
// app.use('/message', messageRouter);
// app.use(adminRouter);
// app.use(userRouter)

for(let useFile in useFiles){
  app.use(useFiles[useFile])
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.status(404).res.render('error',{msg:'Página não encontrada!',image:'/images/svg/erro404.svg'})
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{msg:`Erro interno, tente novamente mais tarde!`,image:'/images/svg/erro500.svg'});
});


module.exports = app;
