import React from 'react';
import { IPropertyData } from '@/interfaces/IProperties';

interface PropertyCardProps {
  property: IPropertyData;
  handleEdit: (property: IPropertyData) => void;
  handleDelete: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, handleEdit, handleDelete }) => {
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
        <button onClick={() => handleEdit(property)} className="btn btn-primary">Edit</button>
        <button onClick={() => handleDelete(property._id!)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default PropertyCard;
