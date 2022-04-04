const express = require('express');

const app = express();
const port = 5000;

app.use('/', require('./routes/index'));

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});