const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const signupRoute = require('../routes/signup'); 


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.resolve(__dirname, '../htmlfiles')));

app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../htmlfiles/signup.html'));
});

app.use('/api/signup', signupRoute);

app.get('/home',(req,res)=>{
  res.sendFile(path.resolve(__dirname, '../htmlfiles/homepage.html'))
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
