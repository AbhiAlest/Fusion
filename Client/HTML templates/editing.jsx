import React, { useState } from 'react';

function EditingPage(props) {
  const [imageSrc, setImageSrc] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
  };

  return (
    <div>
      <h1>Editing Page</h1>
      <input type="file" onChange={handleFileInputChange} />
      {imageSrc && (
        <img src={imageSrc} alt="Uploaded media" />
      )}
      {/* code for image editing features here */}
      <button onClick={() => props.onSubmit(imageSrc)}>Share</button>
    </div>
  );
}

export default EditingPage;
