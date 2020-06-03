const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override')
const passport= require('passport')

const indexRouter = require('./routes/index');
const announcementsRouter = require('./routes/announcements');
const accessRouter = require('./routes/auth');
const planRouter = require('./routes/plans');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user')

const auth = require('./middlewares/auth')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(session({
  secret:'Wonderland',
  resave:true,
  saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',function(req,res,next){

  const user = req.user || req.session.user

  if(user){

    const {id_usuario,thumbnail} = user

    res.locals.user = {
      id_usuario,
      thumbnail
    }
    return next()
  }

  return next()
})

app.use('/', indexRouter);
app.use('/announcements', announcementsRouter);
app.use('/auth', accessRouter);
app.use('/plans', planRouter);

app.use(auth)
app.use(adminRouter);
app.use(userRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.status(404).res.render('error')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
