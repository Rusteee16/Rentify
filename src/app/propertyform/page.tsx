import React, { useState } from 'react';
import axios from 'axios';

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
        lotSize: string;
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
            lotSize: ''
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
            const response = await axios.post('/api/properties', propertyData);
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
                        value={propertyData.propertySize.lotSize}
                        onChange={(e) => handleChange('propertySize', 'lotSize', e.target.value)}
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
            
        </main>
    );
};

export default PropertyForm;
