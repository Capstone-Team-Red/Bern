import React, { useState, useEffect } from 'react';

const UploadImages = ({ onImageUpload }) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  useEffect(() => {
    onImageUpload(imageURLs);
  }, [imageURLs, onImageUpload]);

  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      {imageURLs.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt={`Uploaded ${index}`} />))}
    </>
  );
};

export default UploadImages;