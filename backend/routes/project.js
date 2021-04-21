const router = require("express").Router();
let Project = require("../modles/project.model");
let ApplyRequest = require("../modles/apply-request.model");

router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json({ error: null, data: projects }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/create").post((req, res) => {
  const employer = req.body.employer;
  const description = req.body.description;
  const amount = Number(req.body.amount);
  const deadline = Number(req.body.deadline);

  const newProject = Project({
    employer: employer,
    description: description,
    amount: amount,
    deadline: deadline,
  });

  newProject
    .save()
    .then(() => res.json({ error: null, msg: "Project created successfully!" }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json({ error: null, data: project }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/apply/:id").get((req, res) => {
  ApplyRequest.find({ project: req.params.id })
    .then((requests) => {
      res.json({ error: null, data: requests });
    })
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json({ error: null, msg: "Project deleted successfully!" }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/update").post((req, res) => {
  Project.findById(req.body._id)
    .then((project) => {
      project.employer = req.body.employer;
      project.description = req.body.description;
      project.amount = Number(req.body.amount);
      project.deadline = Number(req.body.deadline);

      project
        .save()
        .then(() =>
          res.json({ error: null, msg: "Project updated successfully" })
        )
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
