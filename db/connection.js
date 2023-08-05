const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongodb Connected to EMS Server");
}).catch((error)=>{
    console.log(`Mongodb Connection Failed : ${error}`);
})