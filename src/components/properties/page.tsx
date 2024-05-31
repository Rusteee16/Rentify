import React, { useState } from 'react';
import { IPropertyData } from '@/interfaces/IProperties';
import axios from 'axios';

interface PropertyCardProps {
  property: IPropertyData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [likes, setLikes] = useState<number>(property.userLikes);

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/properties`, null, {
        params: { _id: property._id }
      });
      setLikes(response.data.newProperty.userLikes);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleInterested = () => {
    console.log(`Interested in property with id: ${property._id}`);
  };

  return (
    <div className="bg-stone-400 border-2 border-amber-500 rounded-xl">
      <div className="text-left p-4">
        <h2>Price: {property.listingPrice}</h2>
        <p>Address: {property.address}</p>
        <p>Built In: {property.yearBuilt}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Bathrooms: {property.bathrooms}</p>
        <p>Floors: {property.floors}</p>
        <p>Local Amenities: {property.localAmenities}</p>
        <p>Contact: {property.sellerMobile}</p>
        <p>Available Time: {property.openTime}</p>
        <button onClick={handleLike} className="btn btn-primary">Like {likes}</button>
        <button onClick={handleInterested} className="btn btn-secondary">Interested</button>
      </div>
    </div>
  );
};

export default PropertyCard;
