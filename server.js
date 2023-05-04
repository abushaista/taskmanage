const express = require("express")
const cors = require("cors")

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());


app.get("/", (req,res)=>{
    res.json({message:"Hello world"});
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`starting on port ${PORT}`))