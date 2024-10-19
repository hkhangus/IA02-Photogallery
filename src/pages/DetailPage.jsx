import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPhotoById } from "../api/photo";
import Loading from "../components/Loading";

export const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        const data = await getPhotoById(id);
        if (data) {
          setPhoto(data);
        } else {
          setPhoto(null);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        setPhoto(null); // In case of error, ensure photo is null
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPhoto();
    }
  }, [id]);

  // If still loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // If no photo is found, show a "No data" message
  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">No data found</p>
      </div>
    );
  }

  // Display the photo details when data is successfully fetched
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-md">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          className="object-cover w-full h-auto rounded-md max-h-96 sm:max-h-full"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mt-4">{photo.tags[0].title}</h2>
          <p className="text-sm sm:text-lg text-gray-800 mt-4">{photo.alt_description}</p>
          <p className="text-md sm:text-lg text-gray-600 mt-2">By 📷: {photo.user.name}</p>
        </div>
      </div>
    </div>
  );
};