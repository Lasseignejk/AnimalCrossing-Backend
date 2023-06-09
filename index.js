const express = require("express")
const app = express()
require("dotenv").config();
const bcrypt = require("bcrypt")
const PORT = 3000
const userRoutes = require("./routes/userRoutes")
const bodyParser = require("body-parser");

app.use(express.json());


app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use("/user", userRoutes)


app.listen(PORT, console.log(`listening on port ${PORT}`))

