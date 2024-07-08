const express = require('express');

const HTTP_SERVER = express();
const cors = require('cors');
require('./dbConfig');
const path = require('path');

const PORT = process.env.PORT || 8000;

const imagePath = path.join(process.cwd(), 'Controllers', 'Data', 'Image');
HTTP_SERVER.use('/api/Data/Image',express.static(imagePath));

HTTP_SERVER.use(express.json());
HTTP_SERVER.use(express.urlencoded({extended:false}))
HTTP_SERVER.use(cors())

HTTP_SERVER.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

HTTP_SERVER.use('/',require('./app'))
