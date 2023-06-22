import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/imageSearch';
import { Spinner } from './Loader/Loader';
import { Button } from './Button/Button';
import { Warning } from './Warnings/Warning.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [error, setError] = useState(null);


  const getImages = async (query, page) => {
    setIsLoading(true);
    try {
      const imageObj = await fetchImages(query, page);

      if (!imageObj.hits.length) {
        setIsEmpty(true);
        return;
      }
      setImages(prev => [...prev, ...imageObj.hits]);
      setIsShowBtn(() => page * 12 < imageObj.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (!query || !page) {
      return;
    }
    getImages(query, page);
  }, [query, page]);


  useEffect(() => {
    setTimeout(() => {
      window.scrollBy({
        top: 1150,
        behavior: 'smooth',
      });
    }, 1000);
  }, [images.length]);


  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setIsShowBtn(false);
  };


  
  const handleLoadingMore = () => {
    setPage(prev => prev + 1);
  };


  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Spinner />}
      {isEmpty && <Warning>Sorry! there are no images...😒</Warning>}
      {error && <Warning>{error} 😡</Warning>}
      <ImageGallery imageItem={images} />
      {isShowBtn && <Button loadMore={handleLoadingMore} />}
    </div>
  );
};
