const express = require('express');
const app = express();
const port = 8000;
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

app.use('/api', bookRoutes);

app.listen(port, ()=>{
    console.log("API is running"); 
});
