require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
let commonRoutes = require('./routes/Common/common');

const app = express();
let PORT = process.env.PORT;

app.use(bodyParser.json());

//USE ROUTE MIDDLEWARES
app.use('/countries', commonRoutes);


app.listen(PORT, () => {
    console.log(`Server is up on Port ${PORT}`);
})

module.exports = {
    app
}