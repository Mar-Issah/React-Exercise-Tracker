const router = require("express").Router();
let User = require("../models/user.model");

//using express router to create various route for user

//get all the users
router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

//create/add user
router.route("/add").post((req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json("user added"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
