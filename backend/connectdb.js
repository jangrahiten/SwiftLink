require('dotenv').config();
const { default: mongoose } = require('mongoose');

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connected successfully');
    }catch(error){
        console.error("database connection failed:", error);
        process.exit(1);
    }
}

module.exports = connectdb;
