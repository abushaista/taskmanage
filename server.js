const express = require("express")
const cors = require("cors")

const dotenv = require('dotenv')
dotenv.config();

const dbconfig = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,dbconfig).then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());


app.get("/", (req,res)=>{
    res.json({message:"Hello world"});
});

require('./app/routes/user.router')(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`starting on port ${PORT}`))