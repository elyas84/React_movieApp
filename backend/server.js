require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnection = require("./database/db");
const path = require("path");
dbConnection();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");


//paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);



app.use("/api/users", userRoutes);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html")); //relative path
//   });
// }

app.listen(PORT, (req, res) => {
  console.log("server is running on port " + PORT);
});
