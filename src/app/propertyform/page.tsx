"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropertyCard from "@/components/propertyform/page";
import { IPropertyData } from "@/interfaces/IProperties";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/navbar/page";

// City, type, and amenities options
const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const types = [
  "Townhouse",
  "Condominium",
  "Detached House",
  "Apartment",
  "Bungalow",
];

const amenities = [
  "Gym",
  "Swimming Pool",
  "Garden",
  "Parking",
  "Playground",
  "Security",
  "WiFi",
  "Lift",
];

const Home = () => {
  // State initialization
  const [propertyData, setPropertyData] = useState<IPropertyData>({
    address: "",
    cost: 0,
    city: "",
    yearBuilt: 0,
    area: 0,
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    amenities: [],
    visitTimings: "",
    type: "",
  });

  const [properties, setProperties] = useState<IPropertyData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const propertiesPerPage = 8;

  const formRef = useRef<HTMLDivElement>(null);

  // Fetch properties from the server
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`/api/propertyform`, {
        params: { page: currentPage, limit: propertiesPerPage },
      });
      console.log(response.data);

      setProperties(response.data.properties);
      setTotalProperties(response.data.totalProperties);
    } catch (error) {
      toast.error("Error fetching properties");
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  // Validate form fields
  const validateFields = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!propertyData.address) {
      valid = false;
      newErrors.address = "Address is required";
    }

    if (propertyData.cost <= 0) {
      valid = false;
      newErrors.cost = "Cost must be a positive number";
    }

    if (propertyData.area <= 0) {
      valid = false;
      newErrors.area = "Area must be a positive number";
    }

    if (
      !propertyData.visitTimings.match(
        /^(\d{1,2}:\d{2}\s?[APM]{2}\s?-\s?\d{1,2}:\d{2}\s?[APM]{2})$/
      )
    ) {
      valid = false;
      newErrors.visitTimings =
        "Visit timings must be in '8:00 AM - 5:30 PM' format";
    }

    if (propertyData.yearBuilt < 0) {
      valid = false;
      newErrors.yearBuilt = "Year Built must be a positive number";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle field changes
  const handleChange = (
    field: keyof IPropertyData,
    value: string | number | string[]
  ) => {
    setPropertyData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAmenityChange = (value: string) => {
    setPropertyData((prevState) => {
      const newAmenities = prevState.amenities.includes(value)
        ? prevState.amenities.filter((amenity) => amenity !== value)
        : [...prevState.amenities, value];
      return {
        ...prevState,
        amenities: newAmenities,
      };
    });
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`/api/propertyform`, propertyData, {
          params: { id: propertyData._id },
        });
        toast.success("Property updated successfully");
      } else {
        await axios.post("/api/propertyform", propertyData);
        toast.success("Property added successfully");
      }
      // Reset form and fetch updated properties
      setPropertyData({
        address: "",
        cost: 0,
        city: "",
        yearBuilt: 0,
        area: 0,
        bedrooms: 1,
        bathrooms: 1,
        floors: 1,
        amenities: [],
        visitTimings: "",
        type: "",
      });
      setEditMode(false);
      fetchProperties();
    } catch (error) {
      toast.error("Error submitting property");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setPropertyData({
      _id: "",
      userEmail: "",
      likes: 0,
      address: "",
      cost: 0,
      city: "",
      yearBuilt: 0,
      area: 0,
      bedrooms: 1,
      bathrooms: 1,
      floors: 1,
      amenities: [],
      visitTimings: "",
      type: "",
    });
    setEditMode(false);
  };

  // Edit a property
  const handleEdit = (property: IPropertyData) => {
    setPropertyData(property);
    setEditMode(true);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Delete a property
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/propertyform`, {
        params: { id: id },
      });
      toast.success("Property deleted successfully");
      fetchProperties();
    } catch (error) {
      toast.error("Error deleting property");
      console.error("Error deleting property:", error);
    }
  };

  return (
    <main className="flex font-rajdhani items-center bg-tuna justify-center flex-col">
      <NavBar />
      <ToastContainer />
      <h1 className="text-6xl text-gallery mt-28 mb-12 font-extrabold">
        Enter Property Details
      </h1>
      <div className="flex flex-col w-8/12 justify-between bg-gray-200 border-2 border-gulfStream text-tuna rounded-lg font-medium text-lg">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-5">
            {/* City Field */}
            <div className="flex flex-col justify-start p-2">
              <label htmlFor="city" className="font-semibold">
                City
              </label>
              <select
                id="city"
                className=" bg-white border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
                value={propertyData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <option value="" disabled>
                  Select a city
                </option>
                {cities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Rent Field */}
            <div className="flex flex-col justify-start p-2 w-2/3">
              <label htmlFor="cost" className="font-semibold">
                Rent
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-0 pl-3">&#8377;</span>
                <input
                  type="text"
                  id="rent"
                  value={propertyData.cost}
                  onChange={(e) => handleChange("cost", e.target.value)}
                  className="pl-8 pr-16 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
                  placeholder="Enter amount"
                />
                <span className="absolute right-0 pr-3 ">/month</span>
              </div>
            </div>
          </div>

          {/* Address Field */}
          <div className="flex flex-col justify-start p-8 w-1/2 ">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <textarea
              id="address"
              className="border border-grey-500 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.address}
              rows={4}
              placeholder="Enter address"
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between p-5">
          {/* House Area */}
          <div className="flex flex-col justify-start p-2 w-2/6">
            <label htmlFor="area" className="font-semibold">
              Area
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                id="area"
                className="pr-16 py-2 w-full border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
                value={propertyData.area}
                onChange={(e) => handleChange("area", +e.target.value)}
              />
              <span className="absolute right-0 pr-3 ">/sqft</span>
            </div>
          </div>

          {/* Number of Bedrooms */}
          <div className="flex flex-col justify-start p-2 w-1/6">
            <label htmlFor="bedrooms" className="font-semibold">
              Number of Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              className="border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.bedrooms}
              onChange={(e) => handleChange("bedrooms", +e.target.value)}
            />
          </div>

          {/* Number of Bathrooms */}
          <div className="flex flex-col justify-start p-2 w-1/6">
            <label htmlFor="bathrooms" className="font-semibold">
              Number of Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              className="border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.bathrooms}
              onChange={(e) => handleChange("bathrooms", +e.target.value)}
            />
          </div>

          {/* Number of Floors */}
          <div className="flex flex-col justify-start p-2 w-1/6">
            <label htmlFor="floors" className="font-semibold">
              Number of Floors
            </label>
            <input
              type="number"
              id="floors"
              className="border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.floors}
              onChange={(e) => handleChange("floors", +e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between p-5">
          {/* Type Field */}
          <div className="flex flex-col justify-start p-2 w-1/3">
            <label htmlFor="type" className="font-semibold">
              Property Type
            </label>
            <select
              id="type"
              className="bg-white border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="" disabled>
                Select a type
              </option>
              {types.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Year Built */}
          <div className="flex flex-col justify-start p-2 w-1/3">
            <label htmlFor="yearBuilt" className="font-semibold">
              Age of Building (years)
            </label>
            <input
              type="number"
              id="yearBuilt"
              className="border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.yearBuilt}
              onChange={(e) => handleChange("yearBuilt", +e.target.value)}
            />
          </div>
          {/* Visit Timings */}
          <div className="flex flex-col justify-start p-2 w-1/3">
            <label htmlFor="visitTimings" className="font-semibold">
              Visit Timings
            </label>
            <input
              type="text"
              id="visitTimings"
              placeholder="8:00 AM - 5:30 PM"
              className="border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparent"
              value={propertyData.visitTimings}
              onChange={(e) => handleChange("visitTimings", e.target.value)}
            />
          </div>
        </div>
        {/* Amenities */}
        <div className="flex flex-col justify-start px-8">
          <label htmlFor="amenities" className="font-semibold mb-2">
            Amenities
          </label>
          <div
            id="amenities"
            className="bg-white border border-grey-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gulfStream focus:border-transparen"
          >
            {amenities.map((option) => (
              <label key={option} className="inline-block m-1 cursor-pointer">
                <input
                  value={option}
                  type="checkbox"
                  checked={propertyData.amenities.includes(option)}
                  onChange={() => handleAmenityChange(option)}
                  className="hidden"
                />
                <span
                  className={`p-2 rounded-md border-2 inline-block text-center min-w-[100px] ${
                    propertyData.amenities.includes(option)
                      ? "bg-gulfStream text-gallery border-transparent font-bold"
                      : " text-tuna border-gulfStream"
                  }`}
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-center py-4">
          <button
            onClick={handleSubmit}
            className="bg-gulfStream text-gallery px-6 py-2 rounded-full font-bold hover:bg-gulfStream-dark transition duration-300"
          >
            {editMode ? "Update Property" : "Add Property"}
          </button>
          {editMode ? (
            <button
              onClick={handleCancel}
              className="bg-gulfStream text-gallery mx-2 px-6 py-2 rounded-full font-bold hover:bg-gulfStream-dark transition duration-300"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </div>

      <h2 className="text-5xl font-extrabold text-gallery mt-24 mb-12">
        Submitted Properties
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="flex justify-center my-12">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 rounded-full bg-gray-300 text-tuna"
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-2 rounded-full ${
              currentPage === index + 1
                ? "bg-gulfStream text-gallery"
                : "bg-gray-300 text-tuna"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 rounded-full bg-gray-300 text-tuna"
        >
          {">"}
        </button>
      </div>
      <footer className="bg-tuna text-gallery p-4 text-center mt-auto">
        <p className="font-rajdhani font-semibold text-lg">
          © 2024 Rentify. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Home;
