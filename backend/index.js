const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({resave: false,
    saveUninitialized: true,secret: "key"}));

const url = "mongodb+srv://asreethp:mongodb@cluster0.9ozwbam.mongodb.net/Test?retryWrites=true&w=majority";
const dbName = "Test";
const collectionName = "test_collec";




async function connectToMongoDB() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName).collection(collectionName);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

// Login to the Student - details in the  test_collec Collection in Test Database
app.post('/', async (req, res) => {
    const { id, password } = req.body;
    const idInt = parseInt(id); // Parse id as integer since id is stored in int32 in collections
    console.log(idInt,password);

    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB();

        const user = await collection.findOne({ id: idInt, password:password });


        if (!user) {
            req.session.roll = idInt; 
            return res.json({ message: "User not found or incorrect password" });
        }

        // User found, authentication successful
        res.status(200).json({ message: "1" ,rollno:idInt});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "0" });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
