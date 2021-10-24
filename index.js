const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Twitter');
const usersRouter = require('./api/users');
const usersTweets = require('./api/tweets');

app.use(express.json());
app.get("/pablo", (req, res) => {
    
    console.log("hola")
    res.send("hi")
})
app.use('/api/users', usersRouter);
app.use('/api/tweets', usersTweets);

app.listen(3000, (e)=> {
if(e){
    console.log(e);
}
else{
    console.log("todo ok")
}
} );





