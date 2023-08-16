import React, { useState, useEffect } from 'react';

const UploadProfileImage = ({ onImageProfileUpload }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImage = [];
    images.forEach((image) => newImage.push(URL.createObjectURL(image)));
    setImage(newImage);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  useEffect(() => {
    onImageProfileUpload(image);
  }, [image, onImageProfileUpload]);

  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      {image.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt={`Uploaded ${index}`} />))}
    </>
  );
};

export default UploadProfileImage;