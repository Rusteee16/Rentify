import React, { useState, useEffect } from "react";
import { IPropertyData } from "@/interfaces/IProperties";
import axios from "axios";
import { BsClock, BsHeart, BsInfoCircle } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight, PiStepsLight } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PropertyCardProps {
  property: IPropertyData;
  liked: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, liked }) => {
  const [likes, setLikes] = useState<number | undefined>(property.likes);
  const [userLiked, setUserLiked] = useState(liked);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get("/api/authcheck");
      setIsAuthenticated(response.data.isAuthenticated);
    };
    checkAuth();
  }, []);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.warning("Please log in to like properties.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await axios.patch(`/api/properties`, null, {
        params: { _id: property._id },
      });
      setLikes(response.data.updatedProperty.likes);
      setUserLiked(response.data.userLiked);
    } catch (error) {
      toast.error("Error updating likes. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleInterested = async () => {
    if (!isAuthenticated) {
      toast.warning("Please log in to show interest.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await axios.post("/api/notification", {
        propertyId: property._id,
      });
      toast.success("Interest email sent successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      console.log("Interest email sent:", response.data);
    } catch (error: any) {
      toast.error("Error sending interest email. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error sending interest email:", error);
    }
  };

  return (
    <div className="w-80 mx-auto bg-[url('/card.svg')] bg-cover bg-center my-8 rounded-xl text-tuna">
      <ToastContainer />
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
            <span className="font-bold"> {property.bedrooms} </span>
            &nbsp;Beds
          </div>
          <div className="flex items-center p-2 border-x border-x-tuna">
            <PiBathtubLight className="mr-2 text-xl" />{" "}
            <span className="font-bold"> {property.bathrooms} </span>
            &nbsp;Baths
          </div>
          <div className="flex items-center p-2">
            <PiStepsLight className="mr-2 text-xl" />{" "}
            <span className="font-bold"> {property.floors} </span>
            &nbsp;Floors
          </div>
        </div>

        {/* Lot Size */}
        <div className="flex justify-between items-center text-tuna text-sm mb-4">
          <span>LOT SIZE</span>
          <div className="text-tuna">
            <span className="font-bold">{property.area}</span>
            <span> sqft</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-tuna text-sm mb-4">
          <span className="flex items-center">
            <BsHeart className="mr-1" />
            Likes
          </span>
          <span className="text-tuna font-bold">{likes}</span>
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
                className="font-bold bg-gallery px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow"
              >
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={handleLike}
            className="flex items-center bg-rose-500 px-4 py-2 text-gallery font-semibold rounded-md shadow-md"
          >
            <BsHeart className="mr-2" />{" "}
            {userLiked.includes(property._id) ? "Liked" : "Like"}
          </button>
          <button
            onClick={handleInterested}
            className="flex items-center px-4 py-2 bg-ebonyClay text-gallery font-semibold rounded-md shadow-md"
          >
            <BsInfoCircle className="mr-2" /> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
