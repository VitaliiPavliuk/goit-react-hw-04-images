import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  ImageGalleryItemStyled,
  ImageGalleryStyled,
} from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItemStyled key={image.id}>
          <ImageGalleryItem image={image} />
        </ImageGalleryItemStyled>
      ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ).isRequired,
};
