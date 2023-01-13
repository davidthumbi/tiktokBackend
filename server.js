import express from "express";
import mongoose from "mongoose";
import Data from "./data.js"
import Videos from "./dbModel.js";

// APP CONFIG
// create instance of app
const app = express();

// define the port the app will listen on
const port = process.env.PORT || 8000;

// MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})


// DB CONFIG
const connection_url = `mongodb+srv://admin:KIprsecZVUCLgOPM@cluster0.ygnveuj.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(connection_url);

// API ENDPOINTS
// health check api request 
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get('/v1/posts', (req, res) => res.status(200).send(Data))

// will let us add a video doc to the videos collection
app.post("/v2/posts", (req, res) => {
    const dbVideos = req.body;

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(201).send(data)
        }
    })
})

// will get a list of all the videos from the database
app.get("/v2/posts", (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err.message)
        }else {
            res.status(200).send(data)
        }
    })
})

// listen on port
app.listen(port, () => console.log(`listening on localhost:${port}`));
