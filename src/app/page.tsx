"use client";

import NavBar from "@/components/navbar/page";
import PropertyCard from "@/components/properties/page";
import axios from "axios";
import Image from "next/image";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

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

export default function Home() {
  const [filters, setFilters] = useState({
    city: "",
    bedrooms: "",
    floors: "",
    propertyType: "",
    sortCriteria: "popularity",
  });
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [liked, setLiked] = useState([]);
  const propertiesPerPage = 8;

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Callback to fetch properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`/api/properties`, {
        params: {
          page: currentPage,
          limit: propertiesPerPage,
          ...filters,
        },
      });

      setProperties(response.data.properties);
      setTotalProperties(response.data.totalProperties);
      setLiked(liked);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Effect to fetch properties
  useEffect(() => {
    fetchProperties();
  }, [currentPage, filters]);

  const sortProperties = () => {
    let sortedProperties;
    switch (filters.sortCriteria) {
      case "costLTH":
        sortedProperties = [...properties].sort(
          (a: any, b: any) => a.cost - b.cost
        );
        break;
      case "costHTL":
        sortedProperties = [...properties].sort(
          (a: any, b: any) => b.cost - a.cost
        );
        break;
      case "popularity":
      default:
        sortedProperties = [...properties].sort(
          (a: any, b: any) => b.likes - a.likes
        );
        break;
    }

    if (JSON.stringify(properties) !== JSON.stringify(sortedProperties)) {
      setProperties(sortedProperties);
    }
  };

  useEffect(() => {
    sortProperties();
  }, [properties]);

  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  return (
    <main className="bg-tuna flex flex-col min-h-screen">
      <ToastContainer />
      <NavBar />
      <section className="text-center items-center flex flex-col bg-[url('/hero.svg')] bg-cover bg-center h-screen">
        <h1 className="font-kavoon font-extrabold text-9xl text-gallery mt-36">
          Rentify
        </h1>
        <h3 className="font-rajdhani text-gulfStream text-xl font-semibold mt-7">
          Find Your Perfect Place with Rentify: Where Your Next Home Awaits
        </h3>
        <div>
          <Image
            src="/hero.png"
            width={900}
            height={900}
            alt="Rentify Hero Image"
          />
        </div>
      </section>
      <section className="text-center flex flex-col bg-tuna bg-cover bg-center">
        <h2 className="font-rajdhani text-gallery text-6xl font-semibold mt-24">
          Properties
        </h2>
        <div className="text-gallery font-bold text-xl bg-ebonyClay border border-gulfStream rounded-2xl mx-48 mt-24">
          <div className="p-4 flex flex-row text-gallery justify-between font-rajdhani">
            <div>
              <label htmlFor="city" className="px-2">
                City:
              </label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="px-2 bg-ebonyClay border border-gulfStream h-10 rounded-lg"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="propertyType" className="px-2">
                Property Type:
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="px-2 bg-ebonyClay border border-gulfStream h-10 rounded-lg"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bedrooms" className="px-2">
                Bedrooms:
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="px-2 bg-ebonyClay border border-gulfStream h-10 rounded-lg"
              >
                <option value="">Bedrooms</option>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                  <option key={i} value={i}>
                    {i} Bedrooms
                  </option>
                ))}
                <option value="10">10+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label htmlFor="floors" className="px-2">
                Floors:
              </label>
              <select
                id="floors"
                name="floors"
                value={filters.floors}
                onChange={handleFilterChange}
                className="px-2 bg-ebonyClay border border-gulfStream h-10 rounded-lg"
              >
                <option value="">Floors</option>
                {Array.from({ length: 4 }, (_, i) => i + 1).map((i) => (
                  <option key={i} value={i}>
                    {i} Floors
                  </option>
                ))}
                <option value="5">5+ Floors</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortCriteria" className="px-2">
                Sort By:
              </label>
              <select
                id="sortCriteria"
                name="sortCriteria"
                value={filters.sortCriteria}
                onChange={handleFilterChange}
                className="px-2 bg-ebonyClay border border-gulfStream h-10 rounded-lg"
              >
                <option value="popularity">Popularity</option>
                <option value="costLTH">Cost: Low to High</option>
                <option value="costHTL">Cost: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-8 mx-48 mt-24 bg-ebonyClay rounded-lg border-2 border-gallery">
          {properties.map((property: any, index: any) => (
            <PropertyCard key={index} property={property} liked={liked} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
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
      </section>
      <footer className="bg-tuna text-gallery p-4 text-center mt-auto">
        <p className="font-rajdhani font-semibold text-lg">
          © 2024 Rentify. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
