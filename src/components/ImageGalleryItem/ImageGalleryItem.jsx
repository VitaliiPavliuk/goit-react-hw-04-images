import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={image.largeImageURL} alt="" />
        </Modal>
      )}

      <ImageGalleryItemImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
