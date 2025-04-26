import mongoose from "mongoose";


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MongoDB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(err){
        console.log(`Data Base Connection Error: ${err.message}`)
        process.exit(1);
    }
}


export default connectDB;