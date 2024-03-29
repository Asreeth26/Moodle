const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const { BSON } = require('bson');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({resave: false,
    saveUninitialized: true,secret: "key"}));

const url = "mongodb+srv://asreethp:mongodb@cluster0.9ozwbam.mongodb.net/Test?retryWrites=true&w=majority";
const dbName = "Test";
const collectionName0 = "test_collec";
const collectionName1 = "Teachers_Details";
const collection_material = "Materials";
const collection_assign = "Assignment";
const collection_attend = "Attendance";




async function connectToMongoDB(collectionName) {
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
        const collection = await connectToMongoDB(collectionName0);

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

app.post('/teacher', async (req, res) => {
    const { id, password } = req.body;
    const idInt = parseInt(id); // Parse id as integer since id is stored in int32 in collections
    console.log(idInt,password);

    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB(collectionName1);

        const user = await collection.findOne({ id: idInt, password:password });


        if (!user) {
         
            return res.json({ message: "User not found or incorrect password" });
        }
        req.session.roll = idInt; 
        // User found, authentication successful
        res.status(200).json({ message: "1" ,rollno:idInt});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "0" });
    }
});



// ---------------Teachaer api -----------------

async function connectToMongoDB_material() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName).collection(collection_material);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
const upload = multer();

app.post('/material', upload.single('file'),async(req,res)=>{
    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB_material();
        const { fileName } = req.body;
        const fileBuffer = req.file.buffer; // Access the uploaded file from the request

        console.log(fileBuffer)

        
        const result = await collection.insertOne({
            fileName,
            file: fileBuffer
          });
      
          console.log('File uploaded successfully:', result.insertedId);
          res.status(200).send('File uploaded successfully');


    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
    }
})

app.get('/material', async (req, res) => {
    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB_material();

        // Retrieve all documents from the collection
        const files = await collection.find().toArray();

        // Send the files as the response
        res.status(200).json(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
});


// -----------------------------




// ------------------------asssignment--------------------------------------------


app.post('/assignment', upload.single('file'),async(req,res)=>{
    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB(collection_assign);
        const { id,fileName } = req.body;
        const fileBuffer = req.file.buffer; // Access the uploaded file from the request

        console.log(fileBuffer)

        
        const result = await collection.insertOne({
            id,
            fileName,
            file: fileBuffer
          });
      
          console.log('File uploaded successfully:', result.insertedId);
          res.status(200).send('File uploaded successfully');


    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
    }
})


app.get('/assignment', async (req, res) => {
    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB(collection_assign);

        // Retrieve all documents from the collection
        const files = await collection.find().toArray();

        // Send the files as the response
        res.status(200).json(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
});



app.post('/assign_upload',upload.single('file'),async(req,res)=>{
    const collection = await connectToMongoDB(collection_assign);
    const { id,sid } = req.body;
    
    const fileBuffer = req.file.buffer; 
    const newValueForSid = `sid${sid}`;
    const newValueForFileBuffer = `fileBuffer${sid}`
    const objectId = new BSON.ObjectId(id);
    const result = await collection.updateMany(
        { _id: objectId },
        { $set: {[newValueForSid] : sid, [newValueForFileBuffer]: fileBuffer }},
        { upsert: true } 
    );

    // Check if any document was updated or inserted
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        res.status(200).send("Entry added/updated successfully.");
    } else {
        res.status(500).send("Failed to add/update entry or no matching document found.");
    }
})




//-------------------------------------------------------------------------








// ---------------------------Attendance------------------------------------------------------------

app.get('/attendance',async (req,res)=>{
    try {
        // Connect to MongoDB
        const collection = await connectToMongoDB(collection_attend);
        const files = await collection.find().toArray();

        // Send the files as the response
        res.status(200).json(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }

})


app.put('/attendance',async (req,res)=>{
    const present = req.body;
    present.push("total")
    console.log(present)

    try {
        // Connect to MongoDB and get the collection
        const collection = await connectToMongoDB(collection_attend);
    
        // Loop through each value in present and update corresponding documents
        for (const key of present) {
            const update = { $inc: { [key]: 1 } }; // Use computed property name
            await collection.updateOne({ section: "A" }, update);
          }
        res.status(200).json({ message: 'Attendance updated successfully' });
  }
    catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
})






//--------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
