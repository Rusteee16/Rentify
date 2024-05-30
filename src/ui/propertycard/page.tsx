import React, { useState } from 'react';
import axios from 'axios';

interface Property {
  user: {
    email: string;
    likes: number;
  };
  basicInformation: {
    address: string;
    listingPrice: string;
    yearBuilt: string;
  };
  propertySize: {
    totalSquareFootage: string;
  };
  interiorFeatures: {
    bedrooms: string;
    bathrooms: string;
    floors: string;
  };
  communityAndLocation: {
    localAmenities: string;
  };
  contactInformation: {
    sellerMobile: string;
    openTime: string;
  };
  _id: string;
  __v: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ( property: any ) => {
  const [likes, setLikes] = useState(property.user.likes);

  const handleLike = async () => {
    try {
      setLikes(likes + 1);
      await axios.patch(`/api/properties`, null, {
        params: { _id: property._id }
      });
    } catch (error) {
      console.error('Error liking the property:', error);
    }
  };

  return (
    <div className="bg-stone-400 border-2 border-amber-500 rounded-xl">
      <div className="text-left p-4">
        <h2>Price: {property.basicInformation.listingPrice}</h2>
        <p>Address: {property.basicInformation.address}</p>
        <p>Built In: {property.basicInformation.yearBuilt}</p>
        <p>Bedrooms: {property.interiorFeatures.bedrooms}</p>
        <p>Bathrooms: {property.interiorFeatures.bathrooms}</p>
        <p>Floors: {property.interiorFeatures.floors}</p>
        <p>Local Amenities: {property.communityAndLocation.localAmenities}</p>
        <p>Contact: {property.contactInformation.sellerMobile}</p>
        <p>Available Time: {property.contactInformation.openTime}</p>
        <p>Likes: {likes}</p>
        <button onClick={handleLike} className="btn btn-primary">
          Like
        </button>
        <button className="btn btn-primary">Interested</button>
      </div>
    </div>
  );
};

export default PropertyCard;
