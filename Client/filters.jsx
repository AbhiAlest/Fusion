import React, { useState } from 'react';
import { fabric } from 'fabric';

function ImageEditor() {
  const [canvas, setCanvas] = useState(null);

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const fabricCanvas = new fabric.Canvas('canvas');
        const fabricImg = new fabric.Image(img);
        fabricCanvas.add(fabricImg);
        setCanvas(fabricCanvas);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    canvas && canvas.getActiveObject().set({
      clipTo: (ctx) => {
        const { left, top, width, height } = canvas.getActiveObject().getBoundingRect();
        ctx.rect(left, top, width, height);
      },
      borderColor: 'red',
      cornerColor: 'red',
      cornerSize: 10,
      cornerStyle: 'circle',
      hasRotatingPoint: false,
    }).setCoords();
    canvas && canvas.discardActiveObject().renderAll();
  };

  const handleZoomIn = () => {
    canvas && canvas.setZoom(canvas.getZoom() * 1.1);
    canvas && canvas.renderAll();
  };

  const handleZoomOut = () => {
    canvas && canvas.setZoom(canvas.getZoom() / 1.1);
    canvas && canvas.renderAll();
  };

  const handleFilter = (filter) => {
    canvas && canvas.getActiveObject().filters[0] = filter;
    canvas && canvas.getActiveObject().applyFilters();
    canvas && canvas.renderAll();
  };

  const handleSave = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    // Upload edited image to server and save to database
    // ... (not finished yet)
  };

  return (
    <div>
      <input type="file" onChange={onFileInputChange} />
      <canvas id="canvas"></canvas>
      <div>
        <button onClick={handleCrop}>Crop</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={() => handleFilter(new fabric.Image.filters.BlackWhite())}>Black and White</button>
        <button onClick={() => handleFilter(new fabric.Image.filters.Walden())}>Walden</button>
        <button onClick={() => handleFilter(new fabric.Image.filters.Hefe())}>Hefe</button>
        <button onClick={() => handleFilter(new fabric.Image.filters.Brannan())}>Brannan</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default ImageEditor;
