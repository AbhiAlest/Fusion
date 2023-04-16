import React from 'react';
import { Crop, Resize, Filter } from './filters';

function EditingPage(props) {
  // your code for image editing functionality goes here
  
  return (
    <div>
      <h1>Editing page</h1>
      <Crop />
      <Resize />
      <Filter />
      {/* rest of the code for editing page */}
    </div>
  );
}

export default EditingPage;
