module.exports = (req,res,next)=>{
    let {user} = req.session

    if(!user){
        return res.redirect('/auth/access')
    }

    res.locals.user = user;

    return next()
}
