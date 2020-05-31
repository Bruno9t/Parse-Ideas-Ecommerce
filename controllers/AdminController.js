const AdminController = {
    index: (req, res) => {
        return res.render('pages/admin', {css: 'admin.css',user:req.session.user}) 
    }
}

module.exports = AdminController