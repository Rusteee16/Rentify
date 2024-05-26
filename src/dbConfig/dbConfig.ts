import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.');            
        })

        connection.on('error', () => {
            console.log('MongoDb connection error. Please make sure MongoDB is running.');
            process.exit();            
        })
        
    } catch (error) {
        console.log('Something messed up');
        console.log(error);
        
    }
}