const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const streamersRouter = require('./src/routes/streamers');
const oneStreamerRouter = require('./src/routes/streamer');
const cors = require('cors');

/* Connect to database */
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true,  useUnifiedTopology: true, })
const db_status = mongoose.connection
db_status.on('error', (error) => console.error(error))
db_status.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())
app.header("Content-Security-Policy: default-src *; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' stackexchange.com");                    

app.set('json spaces', 2);

/* Streamers endpoint */
app.use('/streamers', streamersRouter);

/* Streamer endpoint */
app.use('/streamer', oneStreamerRouter)
/* server connected */
app.listen(5555, function (err) {
    if (err) console.log(err);
    console.log("work");
});