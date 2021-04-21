const router = require('express').Router()
let ApplyRequest = require('../modles/apply-request.model')

router.route('/create').post((req, res)=>{
    const freelancer = req.body.freelancer
    const project = req.body.project

    const newRequest = ApplyRequest({
        freelancer: freelancer,
        project: project
    })

    newRequest.save()
        .then(()=>res.json({error: null, msg: 'Succesfully applied for project!'}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/:id').get((req, res)=>{
    ApplyRequest.find({project: req.params.id})
        .then(requests => res.json({error: null, data: requests}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/:id').delete((req, res)=>{
    ApplyRequest.findByIdAndDelete(req.params.id)
        .then(()=>res.json({error: null, msg: 'Successfully deleted application request!'}))
        .catch(err=>res.status(400).json({error: err}))
})


module.exports = router