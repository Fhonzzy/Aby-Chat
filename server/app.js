require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;


const connectDB = require("./db/connect");
const authRoute = require("./Routes/auth");
const messageRoute = require("./Routes/message");
const userRoute = require("./Routes/user");


//Mids
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/user", userRoute);

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
