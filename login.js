const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const loginRouter = require("../routes/login"); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../htmlfiles')));


app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../htmlfiles/login.html'));
});


app.use('/api/login', loginRouter); 


app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../htmlfiles/homepage.html'));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/login");
});

