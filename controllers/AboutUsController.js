const AboutUsController = {
   index: (req, res) => {
    // return res.send("Ok") 
    return res.render('pages/aboutUs',{css: 'about.css'})
} 
}

module.exports = AboutUsController