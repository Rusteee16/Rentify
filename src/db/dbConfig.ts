
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.'); 
                       
        })

        // await PropertyData.insertMany(propertyDataSeed);

        // console.log("Seed data inserted successfully");

        connection.on('error', (error) => {
            console.log('MongoDb connection error. Please make sure MongoDB is running.');
            console.log(error);
            
            process.exit();            
        })
        
    } catch (error) {
        console.log('Something messed up');
        console.log(error);
        
    }
}