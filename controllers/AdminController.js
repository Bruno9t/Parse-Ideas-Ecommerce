const AdminController = {
    index: (req, res) => {
        return res.render('pages/admin', {css: 'admin.css'}) 
    }
}

module.exports = AdminController