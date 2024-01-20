const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port =process.env.PORT || 3000;

//middleware configuration
app.use(cors());
app.use(express.json());

//sharifulislam4447
//R0BU9SCkz4vqqi3Q



const uri = "mongodb+srv://sharifulislam4447:R0BU9SCkz4vqqi3Q@cluster0.5wr47xq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //connect database
    const database = client.db("usersDB");
    const userCollection = database.collection("users");


    //get the user
    app.get("/users", async (req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })

    //coneect the server side to client side for data
    app.post('/users', async (req, res) => {
        const user = req.body;
        console.log('new user added', user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Simple Crud Is Running')
})

app.listen(port, ()=>{
    console.log(`listening on port,${port}`)
})