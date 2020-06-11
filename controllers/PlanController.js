const {Category, Plan} = require('../models')
const paypal = require('paypal-rest-sdk');


// const config = require('../config/plans/paypal-configure');
// paypal.configure(config)

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AajlMFXXLR8OjQp3G5f1HY5sFdh3tQx3u72i0tq4DMssPFUjnZpJTxKrlxH3Ps-ClybrDVpFGm98BDaA',
  'client_secret': 'ECPrYnR1RGjHDFLvC_re9HoycvnHspRDaI9rcCEhxpA9jASZlJ7vxTlCjlMtdSXhOjSVEdSEEtUKHN0L'
});


const PlanController = {
  index: async (req, res) => {
    let plans = await Plan.findAll()

    return res.render('pages/viewAdPlans', {css: 'viewAdPlans.css', plans});
    
  }, 
  create: (req, res) => {
    let plan = {
      "name": "Plano basic",
      "description": "Criando Plano basico.",
      "merchant_preferences": {
        "auto_bill_amount": "yes", //cobrança automatica do cliente
        "cancel_url": "http://www.cancel.com", // url de redirect
        "initial_fail_amount_action": "continue",
        "max_fail_attempts": "1",
        "return_url": "http://www.success.com",
        "setup_fee": {
            "currency": "BRL",
            "value": "0"
        }
    },
    "payment_definitions": [ //create ciclos de pagamento do plano
      {
        "amount": { //trial ciclo
          "currency": "BRL",
          "value": "0"
        },
        "cycles": "7",
        "frequency": "DAY",
        "frequency_interval": "1",
        "name": "teste gratis",
        "type": "TRIAL"
      },
      {
        "amount": { //regular ciclo
          "currency": "BRL",
          "value": "19"
        },
        "cycles": "0", //QNT CICLE
        "frequency": "MONTH",
        "frequency_interval": "1",
        "name": "teste gratis",
        "type": "REGULAR"
      }
    ],
    "type": "INFINITE" // FIXED or INFINITE
  }

  paypal.billingPlan.create(plan, (err, plan) => {
    if(err){
      console.log(err)
    }else{
      res.json(plan)
    }
  })
},

list: (req, res) => {
  paypal.billingPlan.list({'status': 'ACTIVE'},(err, plans) => {
    if(err){
      console.log(err)
    }else{
      res.json(plans)
    }
  })
},

active: (req, res) => {
    
  var change = [{
    "op":"replace",
    "path":"/", // raiz do plano
    "value": {
      "state": "ACTIVE"
    }
  }]

  paypal.billingPlan.update(req.params.id, change, (err, result) => {
    if(err) {
      console.log(err);
    }
    res.json(result);
  })
},

sign: (_req, res) => {
  res.render('test')
},

signPlan: (req, res) => {
  let {email} = req.body
  let idPlan = 'P-2AW82713XU402662AGQ2TZKI';

  let isoDate = new Date(Date.now());
  isoDate.setSeconds(isoDate.getSeconds() + 4);
  isoDate.toISOString().slice(0,19) + 'Z';

  let signData = {
    "name": "Assinatura do plano Basic",
    "description": "Assinatura do plano Basic",
    "start_date": isoDate,
    "payer": {
      "payment_method": "paypal"
    },
    "plan": {
      "id": idPlan
    },
    "override_merchant_preferences": {
      "return_url": `http://localhost:3000/singReturn?email=${email}`,
      "cancel_url": "http://www.cancel.com"
    }
  }

  //create link to client sing
  paypal.billingAgreement.create(signData, (err, sign) => {
    if(err){
      console.log(err)
    }else{
    res.redirect(sign.links[0].href)
    // res.json(sign)
    }
  })
},
signReturn: (req, res) => {
  let email = req.query.email;
  res.send(email)
  // if(pagamentoConluido){
  //   TabelaDeClientes.find(email).addPlano(planoBasico)
  // }
},

store: (req, res) => {
  return res.render('pages/plans', {css: 'plans.css'})
},

listPlan: async (req, res) => {
  let categories = await Category.findAll()
  let plans = await Plan.findAll()
  
  return res.render('pages/selectionAnnounce', {css: 'announce.css', categories, plans});
}

}

module.exports = PlanController;