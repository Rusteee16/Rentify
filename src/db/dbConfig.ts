
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.'); 
                       
        })


        connection.on('error', (error) => {
            console.log('MongoDb connection error. Please make sure MongoDB is running.');
            console.log(error);
            
            process.exit();            
        })
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
        
    }
}