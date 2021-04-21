const router = require('express').Router()
let Freelancer = require('../modles/freelancer.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

router.route('/').get((req, res)=>{
    Freelancer.find()
        .then(freelancers=>res.json(freelancers))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/register').post((req, res)=>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const email = req.body.email
    const mobile = req.body.mobile
    const ethereum_address = req.body.ethereum_address

    newFreelancer = Freelancer({
        first_name: first_name,
        last_name: last_name,
        password: password,
        email: email,
        mobile: mobile,
        ethereum_address: ethereum_address
    })
    newFreelancer.save()
        .then(()=>res.json({error: null, msg: 'Registered successfully!'}))
        .catch(err=>res.status(400).json({error: err}))
})

router.route('/login').post((req, res)=>{
    Freelancer.findOne({email: req.body.email})
        .then(freelancer=>{
            const validPassword = bcrypt.compareSync(req.body.password, freelancer.password)
            if(!validPassword)
                return res.status(400).json({
                    error: 'Invalid credentials'
                })
            
            const token = jwt.sign(
                {
                    id: freelancer._id,
                    email: freelancer.email,
                    type: 'freelancer'
                },
                process.env.JWT_SECRET_KEY
            )
            res.header('auth-token').json({
                error: null,
                msg: 'Login successfull',
                data: {
                    token
                },
            })
        })
        .catch(err=>res.status(400).json({error: err}))
})
module.exports = router