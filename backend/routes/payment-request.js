const router = require('express').Router()
let PaymentRequest = require('../modles/payment-request.model')

router.route('/create').post((req, res)=>{
    const project = req.body.project;
    const employer = req.body.employer;
    const freelancer = req.body.freelancer;
    const description = req.body.description;
    const amount = req.body.amount;
    
    const newRequest = PaymentRequest({
        project: project,
        employer:employer,
        freelancer: freelancer,
        description: description,
        amount: amount
    })

    newRequest.save()
        .then(()=>res.json({error: null, msg: 'Succesfully sent payment request!'}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/project/:id').get((req, res)=>{
    PaymentRequest.find({project: req.params.id})
        .then(requests => res.json({error: null, data: requests}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/:id').get((req, res)=>{
    PaymentRequest.find(req.params.id)
        .then(requests => res.json({error: null, data: requests}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/:id').delete((req, res)=>{
    PaymentRequest.findByIdAndDelete(req.params.id)
        .then(()=>res.json({error: null, msg: 'Successfully deleted application request!'}))
        .catch(err=>res.status(400).json({error: err}))
})


module.exports = router