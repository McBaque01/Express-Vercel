const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 8080;

app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://vercel-admin-user:hBojOvCZeapjKL4j@cluster0.npib522.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function run() {
    try {
        await client.connect();
        db = client.db("Portfolio");
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        startServer();
    }
    catch (error) {
        await client.close();
        console.error('Error connecting to MongoDB:', error);
    }
}

function startServer() {
    const users = db.collection('Users');

    app.get("/", (req, res) => {
        res.send("Express on Vercel");
      });

    app.post('/signup', async (req, res) => {
        console.log("Hi there");
        const { firstname, lastname, name, email, password } = req.body;
        const newuser = { firstname, lastname, name, email, password };
        try {
            const result = await users.insertOne(newuser);
            console.log('Inserted document:', result.insertedId);
            res.json({ response: { message: 'User created successfully', result: result } });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}
run().catch(console.dir);

module.exports = app;
