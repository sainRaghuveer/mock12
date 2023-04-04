const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { dataRoute } = require("./routes/user.dataroute");
const { authenticate } = require("./middleware/token")
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome to grow calculator backend");
})

app.use("/user", userRoute)
// app.use(authenticate)
app.use("/data", dataRoute)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected with DB")
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at port ${process.env.port}`)
})