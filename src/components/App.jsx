import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { PER_PAGE, requestImages } from 'services/api';
import { LoadMoreBtn } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSetSearchQuery = searchTerm => {
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
    setIsMore(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const fetchedImages = await requestImages(query, page);

        if (fetchedImages.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setIsMore(fetchedImages.totalHits - page * PER_PAGE > 0);
        setImages(prev => [...prev, ...fetchedImages.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSetSearchQuery} />

      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}

      <ImageGallery images={images} />
      {isMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </div>
  );
};
