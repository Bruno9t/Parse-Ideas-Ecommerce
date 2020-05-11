const SolutionController = {
    index: async (req, res) => {
        res.render('pages/searchSolutions', {css: 'searchSolutions.css'})
    }
}

module.exports = SolutionController