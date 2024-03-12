require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const connectDB = require("./db/connect");
const authRoute = require("./Routes/Auth");

//Mids
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1/auth", authRoute);

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

spinServer();
