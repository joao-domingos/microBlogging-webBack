const express = require('express');
const app = express();

const db = require('./models/database');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const port = 3000;

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.json("hello world");
})

db.connectDB();

app.listen(port, () => {
	console.log(`app initialized on ${port}`);
})

