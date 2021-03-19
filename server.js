const { json } = require('express');
const express= require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;
const BlogPost = require('./models/blogPost');


const routes = require('./routes/api')

const URL="mongodb+srv://omkarmali:Omkar1234@democluster.cznsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URI || URL ,
    {useNewUrlParser:true,useUnifiedTopology:true}
    );
    
mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected...!!!!")
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api',routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client\build'));
}

app.listen(PORT,console.log(`Server is Starting at ${PORT}`));