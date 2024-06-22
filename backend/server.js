const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const authMiddleware = require('./middleware/authMiddleware');
const schoolRoute = require('./routes/schools');
const authRoutes = require('./routes/auth');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoute);


app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));