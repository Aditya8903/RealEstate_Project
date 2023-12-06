import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="max-w-screen-md mx-auto mt-8">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listing.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index}`} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            ))}
          </div>
          <div className="text-gray-800">
            <p className="text-3xl font-bold">{listing.name}</p>
            <p className="text-2xl">&#8377;{listing.offer ? listing.discountPrice : listing.regularPrice}</p>
            <p className="text-lg">{listing.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
            <p className="text-base leading-7">{listing.description}</p>
            <p className="text-base">{listing.address}</p>
            <p className="text-base">
              Bedrooms: {listing.bedrooms}, Bathrooms: {listing.bathrooms}
            </p>
            {listing.parking && <p className="text-base text-red-500">Parking spot available</p>}
            <p className={`text-base ${listing.furnished ? 'text-yellow-500' : 'text-gray-500'}`}>
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
