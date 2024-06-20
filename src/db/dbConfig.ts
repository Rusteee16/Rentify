
import propertyDataSeed from "@/seed/propertyDataSeed";
import userSeed from "@/seed/userSeed";
import axios from "axios";
import mongoose from "mongoose";

async function registerUsers(users: any) {
  for (const user of users) {
    try {
        console.log(user);
        
      const response = await axios.post(`http://localhost:3000/api/register`, {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        type: user.type,
      });

      console.log(`User ${user.email} registered successfully:`);
    } catch (error: any) {
      console.error(`Error registering user ${user.email}:`, error.response?.data || error.message);
    }
  }
}

async function addProperties(properties: any) {
  for (const property of properties) {
    try {
        console.log(property);
        
      const response = await axios.post(`http://localhost:3000/api/propertyform`, property);

      console.log(`User ${property.userEmail} registered successfully:`);
    } catch (error: any) {
      console.error(`Error registering user ${property.userEmail}:`, error.message);
    }
  }
}

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.'); 
                       
        })

        // await registerUsers(userSeed);

        // await addProperties(propertyDataSeed);

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