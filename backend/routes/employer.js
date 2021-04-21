const router = require("express").Router();
let Employer = require("../modles/employer.model");
let Project = require("../modles/project.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/").get((req, res) => {
  Employer.find()
    .then((employers) => res.json(employers))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/projects").post((req, res) => {
  Project.find({ employer: req.body.id })
    .then((projects) => res.json({ error: null, data: projects }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/register").post((req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);

  const email = req.body.email;
  const mobile = req.body.mobile;
  const ethereum_address = req.body.ethereum_address;

  newEmployer = Employer({
    first_name: first_name,
    last_name: last_name,
    password: password,
    email: email,
    mobile: mobile,
    ethereum_address: ethereum_address,
  });
  newEmployer
    .save()
    .then(() => res.json({ error: null, msg: "Registered successfully!" }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/login").post((req, res) => {
  Employer.findOne({ email: req.body.email })
    .then((employer) => {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        employer.password
      );
      if (!validPassword)
        return res.status(400).json({
          error: "Invalid credentials",
        });

      const token = jwt.sign(
        {
          id: employer._id,
          email: employer.email,
          type: "employer",
        },
        process.env.JWT_SECRET_KEY
      );
      res.header("auth-token").json({
        error: null,
        msg: "Login successfull",
        data: {
          token,
        },
      });
    })
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
