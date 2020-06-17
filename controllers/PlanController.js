const {Category, Plan,User} = require('../models')
const {APP_URL} = process.env
const recurly = require('recurly');
const uuid = require('node-uuid');

const client = new recurly.Client(process.env.RECURLY_KEY)


const PlanController = {
  index: async (req, res) => {
    let plans = await Plan.findAll()

    return res.render('pages/viewAdPlans', {css: 'viewAdPlans.css', plans});
    
  },

  async choose(req,res){
    let plans = await Plan.findAll()

    return res.render('pages/choosePlan',{css:'plans.css',plans})
  },
  
  create:async (req, res) => {
  //   let plan = {
  //     "name": "Plano basic",
  //     "description": "Criando Plano basico.",
  //     "merchant_preferences": {
  //       "auto_bill_amount": "yes", //cobrança automatica do cliente
  //       "cancel_url": "http://www.cancel.com", // url de redirect
  //       "initial_fail_amount_action": "continue",
  //       "max_fail_attempts": "1",
  //       "return_url": "http://www.success.com",
  //       "setup_fee": {
  //           "currency": "BRL",
  //           "value": "0"
  //       }
  //   },
  //   "payment_definitions": [ //create ciclos de pagamento do plano
  //     {
  //       "amount": { //trial ciclo
  //         "currency": "BRL",
  //         "value": "0"
  //       },
  //       "cycles": "7",
  //       "frequency": "DAY",
  //       "frequency_interval": "1",
  //       "name": "teste gratis",
  //       "type": "TRIAL"
  //     },
  //     {
  //       "amount": { //regular ciclo
  //         "currency": "BRL",
  //         "value": "19"
  //       },
  //       "cycles": "0", //QNT CICLE
  //       "frequency": "MONTH",
  //       "frequency_interval": "1",
  //       "name": "teste gratis",
  //       "type": "REGULAR"
  //     }
  //   ],
  //   "type": "INFINITE" // FIXED or INFINITE
  // }

  try {
    const planCreate = {
      name: 'Super',
      code: 'plan-super',
      description:'Plano hipermegablaster',
      interval_length:1,
      trialUnit:'days',
      trialLength:7,
      hostedPages:{
        success_url:APP_URL+'/auth/access',
        cancel_url:APP_URL,
      }	,
      currencies: [
        {
          currency: 'BRL',
          unitAmount: 89.99
        }
      ]
    }

    const plan = await client.createPlan(planCreate)

    

    return res.json(plan)

  } catch (err) {
    if (err instanceof recurly.errors.ValidationError) {

      return res.json(err.params)
    } else {

      return res.json(err)
    }
  }


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

  return res.render('pages/payment',{css:'payment.css'})
},

async signPlan(req, res){
  // let isoDate = new Date(Date.now());
  // isoDate.setSeconds(isoDate.getSeconds() + 4);
  // isoDate.toISOString().slice(0,19) + 'Z';
console.log(req.body)
  try { 

    const tokenId = req.body['recurly-token'];
    const country = req.body['billing_info[country]']
    const accountCode = req.body['recurly-account-code'] || uuid.v1();

    let subscriptionReq = {
      planCode: 'plan-basic',
      currency: 'BRL',
      account: {
        code: accountCode,
        billing_info: { token_id: tokenId }
      }
    }

    let sub = await client.createSubscription(subscriptionReq)



    console.log(sub)

    return res.json(sub)

  } catch (err) {
    if (err instanceof recurly.errors.ValidationError) {
      // If the request was not valid, you may want to tell your user
      // why. You can find the invalid params and reasons in err.params
      return res.json(err)
    } else {
      // If we don't know what to do with the err, we should
      // probably re-raise and let our web framework and logger handle it
      res.json(err)
    }
  }


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
},
postPlan: (req, res) => {
  let {id_categoria, id_plano} = req.body
  console.log(` Deu certo  id_categaria: ${id_categoria}, id_plano: ${id_plano}`)
},


}

module.exports = PlanController;