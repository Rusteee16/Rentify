import React from "react";
import { IPropertyData } from "@/interfaces/IProperties";
import { BsHeart, BsClock } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { PiBathtubLight, PiStepsLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";

interface PropertyCardProps {
  property: IPropertyData;
  handleEdit: (property: IPropertyData) => void;
  handleDelete: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className=" w-80 bottom-2 mx-auto bg-[url('/card.svg')] bg-cover bg-center my-8 rounded-xl  text-tuna">
      {/* Property Info */}
      <div className="p-6 font-medium">
        <h2 className="text-sm text-tuna">
          {property.type} • {property.yearBuilt} • City
        </h2>
        <div>
          <span className="text-3xl font-extrabold text-tuna my-2">
            ₹ {property.cost}
          </span>
          <span> /m</span>
        </div>
        <p className="flex items-center text-tuna text-sm mb-4">
          <TfiLocationPin className="mr-1" /> {property.address}
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-0 mb-4 text-tuna border bg-gallery border-tuna shadow-md shadow-tuna">
          <div className="flex items-center p-2">
            <IoBedOutline className="mr-2 text-xl" />{" "}
            <span className=" font-bold"> {property.bedrooms} </span>
            &nbsp;Beds
          </div>
          <div className="flex items-center p-2 border-x border-x-tuna">
            <PiBathtubLight className="mr-2 text-xl" />{" "}
            <span className=" font-bold"> {property.bathrooms} </span>
            &nbsp;Baths
          </div>
          <div className="flex items-center p-2">
            <PiStepsLight className="mr-2 text-xl" />{" "}
            <span className=" font-bold"> {property.floors} </span>
            &nbsp;Floors
          </div>
        </div>

        {/* Lot Size */}
        <div className="flex justify-between items-center text-tuna text-sm mb-4">
          <span>LOT SIZE</span>
          <div className="text-tuna">
            <span className=" font-bold">{property.area}</span>
            <span> sqft</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-tuna text-sm mb-4">
          <span className="flex items-center">
            <BsHeart className="mr-1" />
            Likes
          </span>
          <span className="text-tuna font-bold">{property.likes}</span>
        </div>

        {/* Visit Timings */}
        <div className="flex justify-between items-center text-tuna text-sm mb-4">
          <span className="flex items-center">
            <BsClock className="mr-1" /> VISIT TIMINGS
          </span>
          <span className="text-tuna">{property.visitTimings}</span>
        </div>

        {/* Local Amenities Section */}
        <div className="bg-inherit p-4 rounded-lg mb-4 shadow-md shadow-tuna">
          <h4 className="text-tuna text-sm mb-3">LOCAL AMENITIES</h4>
          <div className="flex flex-wrap items-center text-tuna text-sm space-x-1">
            {property.amenities.map((amenity: any, index: any) => (
              <div
                key={index}
                className=" font-bold bg-gallery px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow"
              >
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-around bottom-0">
          <button
            onClick={() => handleEdit(property)}
            className="flex items-center bg-ebonyClay px-4 py-2 text-gallery font-semibold rounded-md shadow-md"
          >
            <MdOutlineEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(property._id!)}
            className="flex items-center px-4 py-2 bg-ebonyClay text-gallery font-semibold rounded-md shadow-md"
          >
            <RiDeleteBin6Line className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
