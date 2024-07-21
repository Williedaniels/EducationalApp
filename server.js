// server.js
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-name.firebaseio.com"
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route to get all users (for admin)
app.get('/users', async (req, res) => {
    const users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    res.json(users);
});

// Route to add a new course (for admin)
app.post('/courses', async (req, res) => {
    const { title, description } = req.body;
    await db.collection('courses').add({ title, description });
    res.send('Course added');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));