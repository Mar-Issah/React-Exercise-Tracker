const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//-----------------------call express fxn--------------------------
const app = express();
const port = process.env.PORT || 5000;

//---------------------------middlewares---------------------------
app.use(cors());
app.use(bodyparser.json());

//--------------------------mongoose-------------------------------
const uri = process.env.ATLAS_URI;
mongoose.connect(
	uri,
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log("an error occured " + err);
		}
	}
);

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("Mongodb database connected successfully");
});

//--------------------------require routes----------------------------
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

//----------------------------listen----------------------------
app.listen(port, () => {
	console.log(`server is running on port : ${port}`);
});
