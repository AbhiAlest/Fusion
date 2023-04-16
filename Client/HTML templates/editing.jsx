import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@material-ui/core';
import { getCroppedImg, getRotatedImage, applyFilter } from './imageUtils';

const EditImage = ({ imageUrl }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState('');

  const imageRef = useRef(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
    // do stuff with cropped image
  };

  const handleRotate = () => {
    setRotation(rotation + 90);
  };

  const handleZoom = (event, value) => {
    setZoom(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredImage = applyFilter(imageUrl, filter);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', marginRight: '1rem' }}>
          <Cropper
            image={filteredImage}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
