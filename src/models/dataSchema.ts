import mongoose from "mongoose";

// Define schema for PropertyData
const propertyDataSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },   
  likes: { type: Number, default: 0 },           
  address: { type: String, required: true },     
  cost: { type: Number, required: true }, 
  city: { type: String, required: true },       
  yearBuilt: { type: Number, required: true },   
  area: { type: Number, required: true },        
  bedrooms: { type: Number, required: true },    
  bathrooms: { type: Number, required: true },   
  floors: { type: Number, required: true },      
  amenities: { type: [String], required: true }, 
  visitTimings: { type: String, required: true },
  type: { type: String, required: true }         
});


// Define schema for user
const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    liked: {type: [String]},
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});



// Define models
const PropertyData = mongoose.models.propertydatas || mongoose.model('propertydatas', propertyDataSchema);
const User = mongoose.models.users || mongoose.model('users', userSchema);

export { PropertyData, User };
