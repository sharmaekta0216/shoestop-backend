

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./db/connectDB');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || process.env.port || 5000;
const mongoURI = process.env.mongoURI || '';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('ShoesStop Backend is running successfully!');
});

app.use('/', userRoutes);
app.use('/api', productRoutes);

const startServer = async () => {
    try {
        console.log('Mongo URI loaded:', !!mongoURI);
        console.log('Mongo URI scheme:', mongoURI.trim().slice(0, 13));

        if (!mongoURI.trim().startsWith('mongodb://') &&
            !mongoURI.trim().startsWith('mongodb+srv://')) {
            throw new Error('Invalid MongoDB URI in environment variable');
        }

        await connectDB(mongoURI.trim());
        console.log('Connected to MongoDB');

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server started at port ${port}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();
