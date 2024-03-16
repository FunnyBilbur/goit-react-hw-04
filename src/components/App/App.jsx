import { useRef, useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { searchImages, searchImg } from '../api';
import Modal from 'react-modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function App() {
  // let subtitle;
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchImages(searchQuery, page);
        setGallery(prevImages => {
          return [...prevImages, ...data];
        });
        data.length != 0
          ? toast.success('HTTP success!!!! 🐷 ✅ 🎉') && setLoadMore(true)
          : toast.error('No results') && setLoadMore(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  const handleSubmit = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = id => {
    setModalIsOpen(true);
    searchImg(id);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const afterOpenModal = () => {
  //   subtitle.style.color = '#00B200';
  // };
  // Modal.setAppElement(App);
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery data={gallery} onClick={openModal} />
      {error && <ErrorMessage />}
      <Toaster />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}
