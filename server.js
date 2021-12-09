const express = require('express');
const connectDB = require('./config');

const app = express();

const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(express.json({ extended: false }));

// Connect DB
connectDB();

app.use('/api/object', require('./routes/api/key'));

app.listen(PORT, () => {
  console.log(`Server is started with ${PORT}.`);
});
