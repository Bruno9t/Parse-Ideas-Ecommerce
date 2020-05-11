const SocialMediaController = {
    index: async (req, res) => {
        res.render('pages/searchSocialMedia', {css: 'searchSocialMedia.css'})
    }
}

module.exports = SocialMediaController