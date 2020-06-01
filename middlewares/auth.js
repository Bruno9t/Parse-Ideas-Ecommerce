module.exports = (req,res,next)=>{
    let {user} = req.session

    if(user || req.user ){
        return next()

    }
    return res.redirect('/auth/access')
}
