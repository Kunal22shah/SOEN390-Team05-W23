const express = require("express"); 
const mongoose = require("mongoose"); 
const dotenv  = require("dotenv"); 
const session = require("express-session")


const app = express();
app.use(express.json());
app.use(session({secret:'secret123'}))
const port = 9000;
dotenv.config();

//Supress DeprecationWarning message
mongoose.set("strictQuery", true);

//Database connection (MongoDB Atlas)
const dbConnect = () => {
    mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            throw err;
        });
};


app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/users', require('./routes/userRoutes.js'))

//Running the server
const server = app.listen(port, () => {
    dbConnect();
    console.log(`Server listening on port ${port}`);
});

module.exports = server
