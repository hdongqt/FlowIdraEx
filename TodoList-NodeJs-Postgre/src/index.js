const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes'));

app.listen(3300, () => {
    console.log('listening on port 3300');
});

