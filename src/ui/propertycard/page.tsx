

export default function PropertyCard(property: any){
    return(
        <div className=" bg-stone-400 border-2 border-amber-500 rounded-xl">
            <div className=" text-left p-4">
                <h2>Price: {property.listingPrice}</h2>
                <p>Address: {property.address}</p>
                <p>Built In: {property.yearBuilt}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>Floors: {property.floors}</p>
                <p>Local Amenities: {property.localAmenities}</p>
                <p>Contact: {property.sellerMobile}</p>
                <p>Available Time: {property.openTime}</p>
                <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    )
}