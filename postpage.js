const postRouter = require('../routes/posthere');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'htmlfiles')));


app.get('/post',(req,res)=>{
   res.sendFile(path.join(__dirname, '../htmlfiles/postpage.html'));

})

app.use('/api/post', postRouter);

app.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, 'htmlfiles', 'homepage.html'))
})

app.listen(3000, ()=>{
    console.log("server is running at 'http://localhost:3000/post'");

})