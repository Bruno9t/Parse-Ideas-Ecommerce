const PlanController = {
  index: (req, res) => {
    res.render('pages/viewAdPlans', {css:'viewAdPlans'});
  }
}

module.exports = PlanController;