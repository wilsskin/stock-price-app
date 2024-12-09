const fs = require('fs'); // For file system operations
const { MongoClient } = require('mongodb'); // For MongoDB operations

// MongoDB Connection Details
const uri = "mongodb+srv://wilsonskin:abc@cluster0.27e6i.mongodb.net/test?retryWrites=true&w=majority"; 
const client = new MongoClient(uri);
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

// Path to the CSV file
const filePath = './companies-1.csv';

// Function to Test MongoDB Connection
async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect(); // Connect to MongoDB
        console.log('Successfully connected to MongoDB!');
        const db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        throw err;
    } finally {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}

// Function to Read CSV File
function readCSV() {
    console.log('Reading the CSV file...');
    if (!fs.existsSync(filePath)) {
        console.error('Error: File not found at', filePath);
        throw new Error('File not found.');
    }

    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    console.log(`Successfully read lines from the CSV file.`);
    const data = [];

    for (let i = 1; i < lines.length - 1; i++) {
        const columns = lines[i].split(',').map((col) => col.replace(/\r$/, ''));
        
        // Skip invalid rows
        if (columns.length < 3 || !columns[0] || !columns[1] || isNaN(parseFloat(columns[2]))) {
            console.warn('Skipping invalid row:', lines[i]);
            continue;
        }

        data.push({
            company: columns[0],
            ticker: columns[1],
            price: parseFloat(columns[2]) // Convert price to a number
        });
        console.log('Processed:', lines[i]);
    }

    return data; // Return the array of objects
}

// Function to Insert Data into MongoDB
async function insertData(data) {
    try {
        console.log('Connecting to MongoDB to insert data...');
        await client.connect(); // Connect to MongoDB
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        console.log('Inserting data into MongoDB...');
        const result = await collection.insertMany(data); // Insert multiple documents
        console.log(`Successfully inserted ${result.insertedCount} records.`);
    } catch (err) {
        console.error('Error inserting data:', err.message);
        throw err;
    } finally {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}

// Main Function with Checks
async function main() {
    try {
        console.log('Starting the process...');
        await testConnection(); // Step 1: Test MongoDB connection
        const data = readCSV(); // Step 2: Read CSV
        console.log(`Total records to insert: ${data.length}`);
        await insertData(data); // Step 3: Insert data into MongoDB
        console.log('Process completed successfully!');
    } catch (err) {
        console.error('Process failed:', err.message);
    }
}

main().catch(console.error);
