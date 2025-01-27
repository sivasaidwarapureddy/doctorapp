const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');


//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    credentials: true,              // Allow cookies and authentication headers    
}));
 // Replace with your frontend's URL

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));

//port
const port = process.env.PORT || 5001;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});