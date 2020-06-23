module.exports=(req,res,next)=>{
    let {user} = req.session

    if(user || req.user ){
        return res.redirect('/panel')
    }
    return next()
}