const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/image',{ useNewUrlParser: true });


app.use(bodyParser.json({ "limits":true}));
app.use(bodyParser.urlencoded({ extended: true, "limits": "50mb" }));
const port = 8888;
app.use('/user',require('./routes/userRouter'));
app.listen(port, () => {
    console.log(`Its my server on ${port}`);
});
