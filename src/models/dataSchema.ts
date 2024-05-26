import mongoose from "mongoose";

// Define schema for PropertyData
const propertyDataSchema = new mongoose.Schema({
    user: {
        email: { type: String, required: true },
        likes: { type: Number, default: 0 }
    },
    basicInformation: {
        address: { type: String, required: true },
        listingPrice: { type: String, required: true },
        yearBuilt: { type: String, required: true }
    },
    propertySize: {
        totalSquareFootage: { type: String, required: true }
    },
    interiorFeatures: {
        bedrooms: { type: String, required: true },
        bathrooms: { type: String, required: true },
        floors: { type: String, required: true }
    },
    communityAndLocation: {
        localAmenities: { type: String, required: true }
    },
    contactInformation: {
        sellerMobile: { type: String, required: true },
        openTime: { type: String, required: true }
    }
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

// Define schema for properties
const propertySchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller (user)
    propertyData: { type: propertyDataSchema, required: true }
});

// Define models
const PropertyData = mongoose.models.propertydatas || mongoose.model('propertydatas', propertyDataSchema);
const User = mongoose.models.users || mongoose.model('users', userSchema);
const Property = mongoose.models.properties || mongoose.model('properties', propertySchema);

export { PropertyData, User, Property };
