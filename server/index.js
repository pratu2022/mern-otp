const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {connectDb} = require("./connection")
const routes = require("./routes")
require("dotenv").config()

const app = express();
const port = 5000;

connectDb();

app.use(
    cors({
    origin : 'http://localhost:5173',
})
)
app.use(express.json())
app.use(cookieParser())

app.use("/api",routes)

app.listen(port,()=>console.log(`Server Running at port ${port}`))