require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const connectDB = require("./db/connect");
const authRoute = require("./Routes/Auth");
const messageRoute = require("./Routes/Message");
const cookieParser = require('cookie-parser');


//Mids
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

const spinServer = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(5000, () => {
			console.log(`server is listening on ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};
//kemdem

spinServer();
