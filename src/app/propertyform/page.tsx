'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '@/ui/propertycard/page';

interface PropertyData {
    user:{
        email: string,
        likes: number,
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
}

const StyledInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <label className="form-control w-full max-w-xs p-6 ">
        <div className="label">
            <span className="label-text text-white">{label}</span>
        </div>
        <input type="text" placeholder={label} value={value} onChange={onChange} className="input input-bordered w-full max-w-xs" />
    </label>
);

const PropertyForm = () => {
    const [propertyData, setPropertyData] = useState<PropertyData>({
        user:{
            email: '',
            likes: 0,
        },
        basicInformation: {
            address: '',
            listingPrice: '',
            yearBuilt: ''
        },
        propertySize: {
            totalSquareFootage: ''
        },
        interiorFeatures: {
            bedrooms: '',
            bathrooms: '',
            floors: '',
        },
        communityAndLocation: {
            localAmenities: '',
        },
        contactInformation: {
            sellerMobile: '',
            openTime: ''
        }
    });

    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const propertiesPerPage = 8;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`/api/propertyform`, {
                    params: { page: currentPage, limit: propertiesPerPage }
                });
                // console.log(response);
                
                setProperties(response.data.properties);
                setTotalProperties(response.data.totalProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [currentPage]);

    const totalPages = Math.ceil(totalProperties / propertiesPerPage);

    const handleChange = (category: keyof PropertyData, field: string, value: string) => {
        setPropertyData(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/propertyform', propertyData);
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <main className='flex items-center justify-center flex-col '>
            <h1 className=' my-16 text-center text-8xl font-extrabold text-white'>Enter Property Details</h1>
            <div className=' w-7/12 border-2 border-gray-300 bg-gray-950 rounded-lg flex flex-col p-10'>
                <div className='flex flex-row'>
                <div className='w-6/12'>
                    <StyledInput
                        label="Address"
                        value={propertyData.basicInformation.address}
                        onChange={(e) => handleChange('basicInformation', 'address', e.target.value)}
                    />

                    <StyledInput
                        label="Year Built"
                        value={propertyData.basicInformation.yearBuilt}
                        onChange={(e) => handleChange('basicInformation', 'yearBuilt', e.target.value)}
                    />

                    <StyledInput
                        label="Bedrooms"
                        value={propertyData.interiorFeatures.bedrooms}
                        onChange={(e) => handleChange('interiorFeatures', 'bedrooms', e.target.value)}
                    />

                    <StyledInput
                        label="Bathrooms"
                        value={propertyData.interiorFeatures.bathrooms}
                        onChange={(e) => handleChange('interiorFeatures', 'bathrooms', e.target.value)}
                    />

                    <StyledInput
                        label="Local Amenities"
                        value={propertyData.communityAndLocation.localAmenities}
                        onChange={(e) => handleChange('communityAndLocation', 'localAmenities', e.target.value)}
                    />

                    
                </div>
                
                <div>
                    <StyledInput
                        label="Listing Price"
                        value={propertyData.basicInformation.listingPrice}
                        onChange={(e) => handleChange('basicInformation', 'listingPrice', e.target.value)}
                    />

                    <StyledInput
                        label="Lot Size"
                        value={propertyData.propertySize.totalSquareFootage}
                        onChange={(e) => handleChange('propertySize', 'totalSquareFootage', e.target.value)}
                    />

                    <StyledInput
                        label="Floors"
                        value={propertyData.interiorFeatures.floors}
                        onChange={(e) => handleChange('interiorFeatures', 'floors', e.target.value)}
                    />

                    <StyledInput
                        label="Available Timings"
                        value={propertyData.contactInformation.openTime}
                        onChange={(e) => handleChange('contactInformation', 'openTime', e.target.value)}
                    />

                    <StyledInput
                        label="Contact Number"
                        value={propertyData.contactInformation.sellerMobile}
                        onChange={(e) => handleChange('contactInformation', 'sellerMobile', e.target.value)}
                    />
                </div>
                </div>

                <button onClick={handleSubmit} className=' btn btn-outline btn-wide self-center'>Submit Property</button>
                
            </div>

            <div className='flex items-center justify-center flex-col'>
                <h1 className="my-16 text-center text-9xl font-extrabold text-amber-500">Rentify</h1>
                <div className="w-10/12 grid grid-cols-4 gap-4">
                    {properties.map((property, index) => (
                        <PropertyCard key={index} property={property} />
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button 
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
};

export default PropertyForm;
