const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const model=require('./model/userModel')
const app = express();

mongoose.connect('mongodb://localhost/admin1',{ useNewUrlParser: true });

app.use(bodyParser.json({ "limits":true}));
app.use(bodyParser.urlencoded({ extended: true, "limits": "50mb" }));
app.use('/user',require('./routes/userRouter'));
const port = 8080;
app.listen(port, () => {
    console.log(`Its my server on ${port}`);
})
;