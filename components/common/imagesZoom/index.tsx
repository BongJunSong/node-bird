import React, { FC, useState } from 'react';
import Slick from 'react-slick';

import { CloseButton, Global, Header, ImageWrapper, Indicator, Overlay, SlickWrapper } from './styles';

interface Props {
  images: any;
  onClose: () => void;
}

const ImagesZoom: FC<Props> = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <Overlay>
        <Global />
        <Header>
          <h1>Detailed image</h1>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0} // display 0 index
              beforeChange={(slide) => setCurrentSlide(slide)} // 현재 사진의 인덱스값 저장
              infinite // 마지막 사진을 넘겼을때 첫번째 사진이 나오게 설정
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map((image) => (
                <ImageWrapper key={image.src}>
                  <img src={image.src} alt={image.src} />
                </ImageWrapper>
              ))}
            </Slick>
            <Indicator>
              <div>
                {currentSlide + 1} / {images.length}
              </div>
            </Indicator>
          </div>
        </SlickWrapper>
      </Overlay>
    </div>
  );
};

export default ImagesZoom;
