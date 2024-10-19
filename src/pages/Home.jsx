import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import GridImageList from "../components/GridImageList";
import { searchPhoto } from "../api/photo";

function Home() {
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const getImages = async () => {
      try {
        const response = await searchPhoto({
          page,
        });
        setIsLoading(false);

        if (response.length === 0) return;
        setImagesList((prev) => [...prev, [...response]]);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to load images. Please try again later."); // Handle error
        console.error("Error fetching images:", err);
      }
    };

    const debounce = setTimeout(() => getImages(), 1000);
    return () => clearTimeout(debounce);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Render
  const renderContent = () => {
    if (error) {
      return (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-red-400">{error}</p>
        </div>
      );
    }

    if (!isLoading && imagesList.length === 0) {
      return (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-gray-400">No results found</p>
        </div>
      );
    }

    return imagesList.map((images, index) => (
      <GridImageList key={index} images={images} />
    ));
  };

  return (
    <div className="min-h-screen  overflow-hidden p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {renderContent()}
          {isLoading && (
            <Loading className="flex justify-center items-center" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
