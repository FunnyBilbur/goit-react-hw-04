import { useRef, useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { searchImages } from '../api';
import { RotatingLines } from 'react-loader-spinner';



export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        // setError(false);
        const data = await searchImages(searchQuery, page);
        console.log(data);
        // setArticles((prevArticles) => {
        //   return [...prevArticles, ...data];
        // });
        data.length !=0 ? toast.success("HTTP success!!!! 🐷 ✅ 🎉") : toast.error("No results");
        
      } catch (error) {
        // setError(true);
        toast.error("Something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  const handleSubmit = (newQuery) =>{
    setSearchQuery(newQuery);
    
  };
  

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}/>
      <ImageGallery></ImageGallery>
      <Toaster></Toaster>
      {isLoading && (<RotatingLines visible={true} height="46" width="46" animationDuration="0.75" ariaLabel="rotating-lines-loading"
      />)}

    </div>
  );
}