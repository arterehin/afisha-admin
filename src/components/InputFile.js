import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import ImageUploading from 'react-images-uploading';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
  Row,
  Col,
  FormGroup,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { X } from "react-feather";
import { Input } from "./Input";

const InputFile = props => {
  const {
    form,
    name,
    isMulti = false
  } = props;
  const { t } = useTranslation('common');
  const [images, setImages] = React.useState([]);
  const maxNumber = 30;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = images.map((item, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={idx}
      >
        <img src={item.data_url} className="input-file__image-carousel" alt="" />
        <CarouselCaption captionText={"caption text"} captionHeader={" item caption"} />
      </CarouselItem>
    );
  });

  return (
    <div className="App">
      <ImageUploading
        multiple={isMulti}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
          }) => (
          <div className="upload__image-wrapper">
            <Button
              color="primary"
              onClick={onImageUpload}
              className="mr-1 mb-2"
            >
              <FontAwesomeIcon
                icon={faUpload}
                className="mr-1"
              />
              {t('inputFile.addButton')}
            </Button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <Row>
                  <Col lg={2}>
                    <div className="input-file__image_container">
                      <img
                        src={image['data_url']}
                        className="input-file__image"
                        alt=""
                      />
                      <span
                        className="image-upload__remove"
                        onClick={() => {
                          onImageRemove(index);
                          setActiveIndex(0);
                        }}
                      >
                        <X size={18} />
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className="mt-2">
                      <Input
                        name={`${name}_description[${index}]`}
                        form={form}
                        placeholder={t("intro")}
                        type="textarea"
                        rows="3"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <div className="mb-2"/>

      {!!slides?.length && isMulti && (
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      )}
    </div>
  );
};

export { InputFile };
