const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Users } = require("../models");
const models = require("../models");
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");
const jwt = require("jsonwebtoken");
const cors = require("cors")

// MIDDLEWARE
router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
router.use(cors())
router.use(bodyParser.json());
router.use(cookieParser());
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({ db: models.sequelize });
router.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: store,
	})
);
store.sync();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(email);
	const user = await Users.findOne({
		where: {
			email: email,
		},
	});
	if (!user) {
		res.status(400).send("user not found");
	}
	const compare = bcrypt.compare(password, user.password)
    if (!compare) {
        res.send("password didn't match")
    }

    const token = jwt.sign(user.dataValues, process.env.SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
    });
    res.send("ok");
		
	
});

router.post("/create", async (req, res) => {
	const { email, password } = req.body;
	bcrypt.hash(password, 10, async (err, hash) => {
		const user = await Users.create({
			email: email,
			password: hash,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		res.send(user);
	});
});

module.exports = router;
