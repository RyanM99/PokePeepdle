const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/server');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
