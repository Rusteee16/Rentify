'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IPropertyData } from '@/interfaces/IProperties';
import PropertyCard from '@/components/propertyform/page';

const StyledInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <label className="form-control w-full max-w-xs p-6 ">
        <div className="label">
            <span className="label-text text-white">{label}</span>
        </div>
        <input type="text" placeholder={label} value={value} onChange={onChange} className="input input-bordered w-full max-w-xs" />
    </label>
);

const PropertyForm = () => {
    const [propertyData, setPropertyData] = useState<IPropertyData>({
        userEmail: '',
        userLikes: 0,
        address: '',
        listingPrice: '',
        yearBuilt: '',
        totalSquareFootage: '',
        bedrooms: '',
        bathrooms: '',
        floors: '',
        localAmenities: '',
        sellerMobile: '',
        openTime: ''
    });

    const [properties, setProperties] = useState<IPropertyData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const propertiesPerPage = 8;

    const formRef = useRef<HTMLDivElement>(null);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`/api/propertyform`, {
                params: { page: currentPage, limit: propertiesPerPage }
            });
            setProperties(response.data.properties);
            setTotalProperties(response.data.totalProperties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [currentPage]);

    const totalPages = Math.ceil(totalProperties / propertiesPerPage);

    const handleChange = (field: keyof IPropertyData, value: string) => {
        setPropertyData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await axios.put(`/api/propertyform`, propertyData, {
                    params: {
                        id: propertyData._id
                    }
                });
            } else {
                await axios.post('/api/propertyform', propertyData);
            }
            setPropertyData({
                userEmail: '',
                userLikes: 0,
                address: '',
                listingPrice: '',
                yearBuilt: '',
                totalSquareFootage: '',
                bedrooms: '',
                bathrooms: '',
                floors: '',
                localAmenities: '',
                sellerMobile: '',
                openTime: ''
            });
            setEditMode(false);
            fetchProperties(); // Refetch properties after submit
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (property: IPropertyData) => {
        setPropertyData(property);
        setEditMode(true);
        formRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/propertyform`, {
                params: {
                    id: id
                }
            });
            fetchProperties(); // Refetch properties after delete
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <main className='flex items-center justify-center flex-col '>
            <h1 className=' my-16 text-center text-8xl font-extrabold text-white'>Enter Property Details</h1>
            <div ref={formRef} className=' w-7/12 border-2 border-gray-300 bg-gray-950 rounded-lg flex flex-col p-10'>
                <div className='flex flex-row'>
                    <div className='w-6/12'>
                        <StyledInput
                            label="Address"
                            value={propertyData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />

                        <StyledInput
                            label="Year Built"
                            value={propertyData.yearBuilt}
                            onChange={(e) => handleChange('yearBuilt', e.target.value)}
                        />

                        <StyledInput
                            label="Bedrooms"
                            value={propertyData.bedrooms}
                            onChange={(e) => handleChange('bedrooms', e.target.value)}
                        />

                        <StyledInput
                            label="Bathrooms"
                            value={propertyData.bathrooms}
                            onChange={(e) => handleChange('bathrooms', e.target.value)}
                        />

                        <StyledInput
                            label="Local Amenities"
                            value={propertyData.localAmenities}
                            onChange={(e) => handleChange('localAmenities', e.target.value)}
                        />
                    </div>
                
                    <div>
                        <StyledInput
                            label="Listing Price"
                            value={propertyData.listingPrice}
                            onChange={(e) => handleChange('listingPrice', e.target.value)}
                        />

                        <StyledInput
                            label="Lot Size"
                            value={propertyData.totalSquareFootage}
                            onChange={(e) => handleChange('totalSquareFootage', e.target.value)}
                        />

                        <StyledInput
                            label="Floors"
                            value={propertyData.floors}
                            onChange={(e) => handleChange('floors', e.target.value)}
                        />

                        <StyledInput
                            label="Available Timings"
                            value={propertyData.openTime}
                            onChange={(e) => handleChange('openTime', e.target.value)}
                        />

                        <StyledInput
                            label="Contact Number"
                            value={propertyData.sellerMobile}
                            onChange={(e) => handleChange('sellerMobile', e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={handleSubmit} className=' btn btn-outline btn-wide self-center'>Submit Property</button>
                
            </div>

            <div className='flex items-center justify-center flex-col'>
                <h1 className="my-16 text-center text-9xl font-extrabold text-amber-500">Rentify</h1>
                <div className="w-10/12 grid grid-cols-4 gap-4">
                    {properties.map((property, index) => (
                        <PropertyCard key={index} property={property} handleEdit={handleEdit} handleDelete={handleDelete}/>
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
