
import propertyDataSeed from "@/seed/propertyDataSeed";
import userSeed from "@/seed/userSeed";
import axios from "axios";
import mongoose from "mongoose";


async function seedData() {
  const users = userSeed;
  const properties = propertyDataSeed;
  try{
    const response = await axios.post(`/api/seeddata`, {users, properties});
    console.log(response.data.message);
  } catch (error: any) {
    console.error(`Error seeding data:`, error.message);
  }
}

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.'); 
                       
        })

        // await seedData();

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