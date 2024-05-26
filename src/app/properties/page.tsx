import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '@/ui/propertycard/page';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(8);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`/api/properties`, {params: {page: currentPage, 
                    limit: propertiesPerPage}});
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [currentPage, propertiesPerPage]);

    const totalPages = Math.ceil(properties.length / propertiesPerPage);
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    return (
        <main className='flex items-center justify-center flex-col'>
            <h1 className="my-16 text-center text-9xl font-extrabold text-amber-500">Rentify</h1>
            <div className="w-10/12 grid grid-cols-4 gap-4">
                {currentProperties.map((property, index) => (
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
        </main>
    );
}
