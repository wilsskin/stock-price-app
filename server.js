const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

// MongoDB Connection Details
const uri = "mongodb+srv://wilsonskin:abc@cluster0.27e6i.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

app.use(cors()); // Enable CORS for all origins

app.get('/search', async (req, res) => {
    const query = req.query.query;
    const type = req.query.type;

    if (!query || !type) {
        return res.status(400).send({ error: 'Invalid search query' });
    }

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const searchQuery = type === 'ticker'
            ? { ticker: query.toUpperCase() }
            : { company: { $regex: query, $options: 'i' } };

        console.log('MongoDB Search Query:', searchQuery);

        const results = await collection.find(searchQuery).toArray();
        res.send(results);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send({ error: 'Error querying the database' });
    } finally {
        await client.close();
    }
});

// Start the Server
const port = process.env.PORT || 3000; // Use Heroku's dynamic PORT or default to 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

});
