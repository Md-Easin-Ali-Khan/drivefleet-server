const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config()

const uri = process.env.MONGODB_URI

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(cookieParser());

const PORT = process.env.PORT

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

module.exports = client;

app.get('/', (req, res) => {
    res.send("Server is runing fine!")
})

app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}`)
})



