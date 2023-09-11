import React, { useState, useEffect, useRef} from "react";

import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

import style from './App.module.css';
import Notiflix from "notiflix";

import { getImages } from "./api/api";




export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [images]);

  const handleSubmit = query => {
    setLoading(true);
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const handleOpenModal = url => {
    setOpenModal(true);
    setLargeImageURL(url);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setLoading(true);
    setLoadMore(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!query) return;

    const getGallery = async query => {
      try {
        const response = await getImages(query, page);
        let imageData = response.data;
        let imageCount = imageData.hits.length;
        let imageTotal = imageData.totalHits;

        if (page === 42) {
          setImages(prev => [...prev, ...imageData.hits.slice(4)]);
        } else if (
          Number.isInteger(imageTotal / imageCount) === true &&
          page === imageTotal / imageCount
        ) {
          setImages(prev => [...prev, ...imageData.hits]);
          setLoadMore(false);
          return;
        } else {
          setImages(prev => [...prev, ...imageData.hits]);
        }

        if (imageCount === 0) {
          setImages([]);
          setLoadMore(false);

          Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          return;
        }

        if (imageCount < 12 && page === 1) {
          setLoading(false);
          setLoadMore(false);

          Notiflix.Notify.success(
            `Maximum search value found, there are ${imageCount} images.`
          );
          return;
        }

        if (page >= 2 && page <= 41) {
          setLoadMore(true);

          return;
        }

        if (imageTotal > 12) {
          setLoading(true);
          setLoadMore(true);

          Notiflix.Notify.success(`We found ${imageTotal} images.`);
          return;
        }
      } catch (error) { 
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getGallery(query, page);
  }, [query, page]);

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery
        images={images}
        openModal={handleOpenModal}
        loadMore={handleLoadMore}
      />
      {loading && <Loader />}
      <div className={style.button}>
        {loadMore && <Button handleClick={handleLoadMore} text="Load More" />}
      </div>
      {openModal && (
        <Modal largeImageURL={largeImageURL} modalClose={handleModalClose} />
      )}
    </div>
  );
};