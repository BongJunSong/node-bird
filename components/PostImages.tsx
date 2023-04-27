import { PlusOutlined } from '@ant-design/icons';
import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';

import ImagesZoom from './common/imagesZoom';

interface Props {
  images: any;
}

const PostImages: FC<Props> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          src={images[1].src}
          style={{ width: '50%', display: 'inline-block' }}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img role="presentation" src={images[0].src} style={{ width: '50%' }} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          See {images.length - 1} more pictures
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    </>
  );
};

export default PostImages;
