const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/pramod', { useNewUrlParser: true });
app.use(bodyParser.json({ "limits":'50mb'}));
app.use(bodyParser.urlencoded({extended: true, "limits": "50mb" }));


const port = 5000;

app.use('/user',require('./routes/userRouter'));
app.use('/admin',require('./routes/adminRouter'));
app.use() 



app.listen(port, () => {
    console.log(`Its my server on ${port}`);
});
