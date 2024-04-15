const mongoose = require("mongoose")

const connectDb = async() =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        if(!connection)
        {
            console.log('Connection failed!');
        }
        else{
            console.log('Connected!');

        }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {connectDb};