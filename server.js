const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mongoose
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/thought-catcher',
	{
		useNewUrlParser: true,
		useUnifiedTopology: false
	}
);

// log mongo queries
mongoose.set('debug', true);

// router
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
