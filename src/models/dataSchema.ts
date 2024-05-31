import mongoose from "mongoose";

// Define schema for PropertyData
const propertyDataSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    userLikes: { type: Number, default: 0 },
    address: { type: String, required: true },
    listingPrice: { type: String, required: true },
    yearBuilt: { type: String, required: true },
    totalSquareFootage: { type: String, required: true },
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    floors: { type: String, required: true },
    localAmenities: { type: String, required: true },
    sellerMobile: { type: String, required: true },
    openTime: { type: String, required: true }
});


// Define schema for user
const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true }
});



// Define models
const PropertyData = mongoose.models.propertydatas || mongoose.model('propertydatas', propertyDataSchema);
const User = mongoose.models.users || mongoose.model('users', userSchema);

export { PropertyData, User };
