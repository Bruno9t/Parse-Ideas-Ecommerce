module.exports = {
    index(req,res){
        return res.render('pages/forgotPassword',{css: 'forgotPassword.css'})
    }
}