import { Item } from './ImageGalleryItem.styled';
import { ModalComponent } from 'components/ModalComponent/ModalComponent';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ previeImg, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState('null');

  const openModal = () => {
    setIsModalOpen(true);
    setClickedImage(largeImageURL);
  };

  const closeModal = () => {
    setClickedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Item onClick={openModal}>
        <img src={previeImg} alt="img" />
      </Item>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          clickedImage={clickedImage}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  previeImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
